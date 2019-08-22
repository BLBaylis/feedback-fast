const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleID: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: String,
  credits: { type: Number, default: 0 },
});

userSchema.statics.hashPassword = async function hashPassword(password) {
  let hash = false;
  try {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
  } catch (err) {
    console.error(err);
  }
  return hash;
};

userSchema.statics.comparePassword = async function comparePassword(password, dbPassword) {
  let result = false;
  try {
    result = await bcrypt.compare(password, dbPassword);
  } catch (err) {
    console.error(err);
  }
  return result;
};

mongoose.model('users', userSchema);
