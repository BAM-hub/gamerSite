const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonWebToken');

// TBD
const Chat = require('../../models/Chat');

// POST Register new conversations
// private /api/chat

router.post('/chat/:id', auth, async (req, res) => {
  
  const { id, name } = req.body; 
  let chat = new Chat;

  
});

router.get('/chat/:id', auth, async (req, res) => {
  
});
