const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/recipients/:surveyId', requireLogin, async (req, res) => {
    const { surveyId } = req.params;
    const survey = await Survey.findOne({ _id: surveyId }).select('recipients');
    if (!survey) {
      return res.status(404).end();
    }
    const recipients = survey.recipients.map(({ _id, email }) => ({ _id, email }));
    return res.status(200).send(recipients);
  });
};
