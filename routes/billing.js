const { stripeSecretKey } = require('../config/keys');
// eslint-disable-next-line import/order
const stripe = require('stripe')(stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
  app.post('/api/stripe', requireLogin, async (req, res) => {
    try {
      await stripe.charges.create({
        amount: 500,
        currency: 'gbp',
        source: req.body.id,
        description: '5 credits for £5',
      });
      req.user.credits += 5;
      const user = await req.user.save();
      res.status(200).json(user);
    } catch (err) {
      const newErr = new Error('Stripe Error');
      res.status(err.statusCode).send(Object.assign(newErr, err));
    }
  });
};
