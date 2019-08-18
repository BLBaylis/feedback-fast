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
    const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: 0 });
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:response', (req, res) => res.send('Thanks for your feedback!'));

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const {
      title, recipients, subject, body,
    } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.map(email => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
      lastResponded: null,
    });
    const mailer = new Mailer(survey, emailTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.status(200).send(user);
    } catch (err) {
      console.error(err);
      res.status(422);
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
