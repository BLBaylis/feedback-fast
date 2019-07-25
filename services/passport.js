const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((userProfile, done) => {
  const { id : recordID } = userProfile;
  done(null, recordID);
});

passport.deserializeUser((recordID, done) => {
  User.findById(recordID).then(recordID => done(null, recordID));
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id })
        .then(userInfo => {
          if (userInfo) {
            console.log("user found");
            done(null, userInfo);
          } else {
            new User({ googleID: profile.id })
              .save()
              .then(newUser => done(null, newUser));
          }
        })
        .catch(console.error);
    }
  )
);
