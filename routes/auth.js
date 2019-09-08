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
    const { credits, id, email } = req.user;
    req.user = {
      credits,
      id,
      email,
    };
    res.redirect('/dashboard/surveys');
    res
      .status(200)
      .send(req.user)
      .redirect('/dashboard/surveys');
  });

  app.post('/api/login', requireLogOut, passport.authenticate('local-login'), (req, res) => {
    res
      .status(200)
      .send(req.user)
      .redirect('/dashboard/surveys');
  });

  app.post('/api/register', requireLogOut, passport.authenticate('local-register'), (req, res) => {
    res
      .status(200)
      .send(req.user)
      .redirect('/dashboard/surveys');
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/user-info', requireLogin, (req, res) => {
    res.send(req.user);
  });
};
