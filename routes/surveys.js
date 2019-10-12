const mongoose = require('mongoose');
const { URL } = require('url');
const Path = require('path-parser').default;
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplates');
const uniqueByEmailAndSurveyId = require('../utils/uniqueByEmailAndSurveyId');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireLogin, async (req, res) => {
    try {
      const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: 0 });
      if (!surveys) {
        return res.status(404).end();
      }
      res.status(200).json(surveys);
    } catch (err) {
      return res.status(500).send(err);
    }
  });

  app.get('/api/surveys/:surveyId/:response', (req, res) => res.send('Thanks for your feedback!'));

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    console.log('Reached route');
    const {
      title, recipients, subject, body,
    } = req.body;
    console.log(`title : ${title}`);
    console.log(`recipients : ${recipients}`);
    console.log(`subject : ${subject}`);
    console.log(`body : ${body}`);
    console.log(`req.user.id : ${req.user.id}`);
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
      lastResponded: null,
    });
    console.log(survey);
    const mailer = new Mailer(survey, emailTemplate(survey));
    try {
      await mailer.send();
      const newSurvey = await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.status(201).json({ user, survey: newSurvey });
    } catch (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });

  app.delete('/api/surveys/:surveyId', async (req, res) => {
    const id = req.params.surveyId;
    try {
      const deleteOutcome = await Survey.deleteOne({ _id: id }).exec();
      if (deleteOutcome.deletedCount !== 1) {
        throw new Error('Not deleted');
      }
      res.status(204).end();
    } catch (err) {
      res.status(500).send(err);
    }
  });

  app.post('/api/surveys/webhook', (req) => {
    const clickEvents = req.body.filter(event => event.event === 'click');
    const path = new Path('/api/surveys/:surveyId/:response');
    const eventsData = clickEvents.map(({ email, url }) => {
      const isPathValid = path.test(new URL(url).pathname);
      if (isPathValid && email) {
        const { surveyId, response } = isPathValid;
        return {
          email,
          surveyId,
          response,
        };
      }
      return undefined;
    });
    const validEventsData = eventsData.filter(curr => !!curr);
    const uniqueEventsData = validEventsData.length > 1 ? uniqueByEmailAndSurveyId(validEventsData) : validEventsData;
    uniqueEventsData.forEach(({ email, surveyId, response }) => {
      Survey.updateOne(
        {
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        },
        {
          $inc: { [response]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date(),
        },
      ).exec();
    });
  });
};
