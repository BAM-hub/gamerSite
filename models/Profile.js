const mongoose = require('mongoose');

const ProfileScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  staredGame: {
    name: {
      type: String,
      required: true
    },
    score: {
      type: Number
    },
    tags: {
      type: Array,
      required: true
    }
  },
  social: {
    facebook: {
      type: String
    },
    instagram: {
      type: String
    },
    whatsapp: {
      type: String
    }
  },
  gameList: [{
    name: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: 0
    }
  }]
});


module.exports = Profile = mongoose.model('profile', ProfileScheme);