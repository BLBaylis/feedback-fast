const passport = require('passport');

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

  app.post('/api/login', requireLogOut, (req, res, next) => {
    passport.authenticate('local-login', async (err, user, info) => {
      if (err) {
        res.send(err);
        return next(err);
      }
      if (!user) {
        return res.json({ error: info.message });
      }
      return req.logIn(user, (logInErr) => {
        if (err) {
          res.json({ error: logInErr });
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.post('/api/register', requireLogOut, (req, res, next) => {
    passport.authenticate('local-register', (err, user, info) => {
      if (err) {
        res.send(err);
        return next(err);
      }
      if (!user) {
        return res.json(info.message);
      }
      return req.logIn(user, (logInErr) => {
        if (err) {
          next(logInErr);
          return next(err);
        }
        return res.json(user);
      });
    })(req, res, next);
  });

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  app.get('/api/user-info', (req, res) => res.send(req.user));
};
