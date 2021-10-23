const mongoose = require('mongoose');

const ChatSchema = mongoose.schema({
  conversation: [{
    sender: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    conversationId: {
      type: String,
      required: true
    },
    time: {
      type: Date,
      default: Date.now
    },
    admin: {
      type: String,
      required: true
    }
  }]
});

module.exports = Chat = mongoose.model('Chat', chatScheme);