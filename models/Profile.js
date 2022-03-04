const mongoose = require('mongoose');

const ProfileScheme = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
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
      type: String,
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
  PreferedConsole: {
    type: String,
    default: 'NONE'
  },
  gameList: [{
    name: {
      type: String,
    },
    score: {
      type: Number,
      default: 0
    },
    image: {
      type: String
    },
    tags: {
      type: String,
      default: ''
    }
  }],
  conversations: [{
    conversationId: {
      type: String,
      required: true
    },
    recipientName: {
      type: String,
      required: true
    },
    recipientEmail: {
      type: String,
      required: true
    }
  }]
});


module.exports = Profile = mongoose.model('profile', ProfileScheme);