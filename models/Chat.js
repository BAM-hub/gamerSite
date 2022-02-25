const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
  conversation: [{
    message: {
      type: String,
    },
    sender: {
      type: String,
      required: true
    },
    reciver: {
      type: String
    },
    time: {
      type: Date,
      default: Date.now
    },
    id: {
      type: String
    }
  }],
  conversationId: {
    type: String,
    required: true
  },
  users: [{
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  }],
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);