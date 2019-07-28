const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users');
require('./services/passport');
const authRoutes = require('./routes/auth');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => res.send('Howdy!'));
authRoutes(app);
const PORT = process.env.PORT || 5000;

app.listen(PORT);
