const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((userProfile, done) => {
  const { id: recordID } = userProfile;
  done(null, recordID);
});

passport.deserializeUser((recordID, done) => {
  User.findById(recordID).then(userProfile => done(null, userProfile));
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
        .then((existingDBUserProfile) => {
          if (existingDBUserProfile) {
            done(null, existingDBUserProfile);
          } else {
            new User({ googleID: googleUserProfile.id })
              .save()
              .then(newDBUserProfile => done(null, newDBUserProfile));
          }
        })
        .catch(console.error);
    },
  ),
);
