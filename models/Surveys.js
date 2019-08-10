const mongoose = require('mongoose');
const RecipientSchema = require('./Recipients');

const { Schema } = mongoose;

const surveySchema = new Schema({
  title: String,
  recipients: [RecipientSchema],
  subject: String,
  body: String,
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 },
  _user: { type: Schema.Types.ObjectId, ref: 'Users' },
  dateSent: Date,
  lastResponded: Date,
});

mongoose.model('surveys', surveySchema);
