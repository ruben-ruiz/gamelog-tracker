const mongoose = require('mongoose');
const Games = require('./Game.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    max: 64,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  library: [Games]
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

module.exports = User;