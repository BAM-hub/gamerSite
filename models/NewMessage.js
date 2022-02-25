const mongoose = require('mongoose');

const NewMessageSchema = new mongoose.Schema({
  newMessage: {
    message: { 
      message: {type: String, default: 'Empty'} 
    },
    name: { type: String },
    time: Date,
    count: {
      type: Number,
      default: 0
    }
  },
  conversationId: {
    type: String
  }
});