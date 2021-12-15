const mongoose = require('mongoose');

const GameScheme = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  tags: {
    type: String
  }
});

module.exports = Games = mongoose.model('Games', GameScheme);