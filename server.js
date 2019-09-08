const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/Users');
require('./models/Surveys');
require('./services/passport');
const authRoutes = require('./routes/auth');
const billingRoutes = require('./routes/billing');
const surveyRoutes = require('./routes/surveys');
const recipientsRoutes = require('./routes/recipients');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const app = express();
app.use(bodyParser.json());
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
billingRoutes(app);
surveyRoutes(app);
recipientsRoutes(app);

app.use((err, req, res, next) => {
  if (err.message === 'There is already an account associated with this email.') {
    res.status(409).send(err);
  } else {
    next();
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
