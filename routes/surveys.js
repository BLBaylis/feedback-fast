const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const emailTemplate = require('../services/emailTemplates');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/feedback', (req, res) => res.send('Thanks for your feedback!'));

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
};
