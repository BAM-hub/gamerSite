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
      users: [
        { email: creatorData.email, name: creatorData.name },
        { email: recipientData.email, name: recipientData.name }
      ]
    });

    await conversation.save();

    const creatorProfile = await Profile.findOne({ email: creator });
    const recipientProfile = await Profile.findOne({ email: recipient });
    
    let creatorConversations = creatorProfile.conversations;
    let recipientConversations = recipientProfile.conversations;


    creatorConversations.push({
      conversationId: creatorData.id + ' ' + recipientData.id,
      recipientName: recipientData.name,
      recipientEmail: recipient,
      image: recipientProfile.image
    });
    await Profile.findOneAndUpdate(
      { email: creator },
      { conversations: creatorConversations });


    recipientConversations.push({
      conversationId: creatorData.id + ' ' + recipientData.id,
      recipientName: creatorData.name,
      recipientEmail: creator,
      image: creatorProfile.image
    });

    await Profile.findOneAndUpdate(
      { email: recipient },
      { conversations: recipientConversations });

    res.send(conversation);
    
  } catch (err) {
    res.status(500).send('server error');
  }
  
});

router.get('/:id', async (req, res) => {
  try {
    //use find for potential documents spliting
    const chat = await Chat.find({ conversationId: req.params.id })
      .sort({ dateCreated: -1 }).limit(1).select('conversation conversationId');
    res.send(chat[0]);
  } catch (err) {
    res.status(500).send('Server Error');
  }
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

router.get('/get-user-alerts/:id/:email', async (req,res) => {
  const { id, email } = req.params;
  try {
    const profile = await Profile.findById(id);
    const { conversations } = profile;
    
    const alerts = await Promise.all(conversations.map( async convo => {
        try {
          const chat = await Chat.findOne({ conversationId: convo.conversationId });
          const { users, conversationId } = chat;
          const alert =  users.filter(user => {
            if(user.email === email) 
              return {alerts: user.alerts};
          });
          console.log(alert);
          return {alert: alert[0], conversationId};
        } catch (err) {
          res.status(500).send('Internal Server Error');
        }
      })
    );
    return res.send(alerts);
  } catch (err) {
    res.status(500).send('server error');
  }
});

module.exports = router;