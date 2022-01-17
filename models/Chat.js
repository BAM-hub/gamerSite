const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
  conversation: [{
    message: {
      sender: {
        type: String,
        required: true
      },
      recipient: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      time: {
        type: Date,
        default: Date.now
      }
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
    }
  }],
  dateCreated: {
    type: Date,
    default: Date.now()
  }
});

module.exports = Chat = mongoose.model('Chat', ChatSchema);