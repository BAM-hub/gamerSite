const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonWebToken');

// TBD
const Chat = require('../../models/Chat');
const Profile = require('../../models/Profile.js');
const User = require('../../models/User');

// POST Register new conversations
// private /api/chat

router.post('/create-conversation', auth, async (req, res) => {
  
  const { creator, recipient } = req.body; 
  try {

    let creatorData = await User.findOne({ email: creator });
    let recipientData =  await User.findOne({ email: recipient });

    if(!recipientData){
      return res.send('recipient not found');
    }

    const oldConvo = await Chat.findOne({ conversationId: creatorData.id + ' ' + recipientData.id });
    if(oldConvo){
      return res.send('there already is a conversation between you');
    }

    const conversation = new Chat({
      conversationId: creatorData.id + ' ' + recipientData.id,
      users: [{ email: creatorData.email }, { email: recipientData.email }]
    });

    await conversation.save();

    let creatorConversations = await Profile.findOne({ email: creator });
    let recipientConversations = await Profile.findOne({ email: recipient });
    
    creatorConversations = creatorConversations.conversations;
    recipientConversations = recipientConversations.conversations;


    creatorConversations.push({
      conversationId: creatorData.id + ' ' + recipientData.id,
      recipient: recipientData.name
    });
    await Profile.findOneAndUpdate(
      { email: creator },
      { conversations: creatorConversations });


    recipientConversations.push({
      conversationId: creatorData.id + ' ' + recipientData.id,
      recipient: creatorData.name
    });

    await Profile.findOneAndUpdate(
      { email: recipient },
      { conversations: recipientConversations });

    res.send(conversation);
    
  } catch (err) {
    res.status(500).send('server error');
  }
  
});

router.get('/chat/:id', auth, async (req, res) => {
  
});

//private route
//get user by email
router.get('/get-user-by-email/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email: email }).select('-password');
    if(!user) return res.send('User Not Found!');
    res.send(user);
  } catch (err) {
    res.status(500).send('server error');
  }
});

module.exports = router;