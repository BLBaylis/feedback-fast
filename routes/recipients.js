const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/recipients/:surveyId', requireLogin, async (req, res) => {
    const { surveyId } = req.params;
    const survey = await Survey.findOne({ _id: surveyId }).select('recipients');
    if (!survey) {
      return res.send({ error: 'No Record Found' });
    }
    const recipients = survey.recipients.map(({ _id, email }) => ({ _id, email }));
    return res.send(recipients);
  });
};
