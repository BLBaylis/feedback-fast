const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((userProfile, done) => {
  const { id: recordID } = userProfile;
  done(null, recordID);
});

passport.deserializeUser((recordID, done) => {
  User.findById(recordID)
    .then((userProfile) => {
      const { credits, email, _id: id } = userProfile;
      return {
        credits,
        id,
        email,
      };
    })
    .then(userProfile => done(null, userProfile))
    .catch(err => done(err));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken, refreshToken, googleUserProfile, done) => {
      User.findOne({ googleID: googleUserProfile.id })
        .select({ credits: 1, _id: 1, email: 1 })
        .then((existingDBUserProfile) => {
          if (existingDBUserProfile) {
            done(null, existingDBUserProfile);
          } else {
            // eslint-disable-next-line no-underscore-dangle
            new User({ googleID: googleUserProfile.id, email: googleUserProfile._json.email })
              .save()
              .then((newDBUserProfile) => {
                const { credits, email, _id: id } = newDBUserProfile;
                const newUserProfile = {
                  credits,
                  id,
                  email,
                };
                done(null, newUserProfile);
              });
          }
        })
        .catch(err => done(err));
    },
  ),
);

passport.use(
  'local-register',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      let newUserProfile;
      try {
        const existingUserProfile = await User.findOne({ email });
        if (existingUserProfile) {
          return done(new Error('There is already an account associated with this email.'));
        }
        const hash = await User.hashPassword(password);
        const newUserProfileWithPwd = await new User({
          email,
          password: hash,
        }).save();
        const { credits, _id } = newUserProfileWithPwd;
        newUserProfile = { email, credits, id: _id };
      } catch (err) {
        return done(err);
      }
      return done(null, newUserProfile);
    },
  ),
);

passport.use(
  'local-login',
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const invalidCredentialsDone = () => done(null, false, {
        message: 'Incorrect email or password.',
      });
      let userProfile;
      try {
        const existingUserProfile = await User.findOne({ email });
        if (!existingUserProfile) {
          return invalidCredentialsDone();
        }
        const outcome = await User.comparePassword(password, existingUserProfile.password);
        if (!outcome) {
          return invalidCredentialsDone();
        }
        const { credits, _id } = existingUserProfile;
        userProfile = {
          email,
          credits,
          id: _id,
        };
      } catch (err) {
        return done(err);
      }
      return done(null, userProfile);
    },
  ),
);
