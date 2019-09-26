const passport = require('passport');
const requireLogin = require('../middlewares/requireLogin');
const requireLogOut = require('../middlewares/requireLogOut');

module.exports = (app) => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    }),
  );

  app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/dashboard/surveys');
  });

  app.post('/api/login', requireLogOut, passport.authenticate('local-login'), (req, res) => {
    res.status(200).send(req.user);
  });

  app.post('/api/register', requireLogOut, passport.authenticate('local-register'), (req, res) => {
    res.status(200).send(req.user);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/user-info', requireLogin, (req, res) => {
    res.status(200).send(req.user);
  });
};
