const Chat = require('../models/Chat');

const socketHandler = async (socket) => {
    console.log(`connection by ${socket.id}`);
    socket.on('join', (id) => {
      socket.join(id);
      console.log(`${id} joined`);
   });
  
    socket.on('send_message', async msg => {
      //console.log(msg);
      const users = msg.users.map(user => {
        if(user.email === msg.recipientEmail)
          return {
            name: user.name,
            email: user.email,
            alerts: {
              count: ++user.alerts.count,
              message: msg.message
            }
          };
          return {
            name: user.name,
            email: user.email,
            alerts: {
              count: 0,
              message: msg.message
            }
          }
      });
      await Chat.findOneAndUpdate(  
        { conversationId: msg.chatId },
        {
          $addToSet: {
            conversation: [
              {
                sender: msg.sender,
                reciver: msg.reciver,
                id: msg.id,
                message: msg.message,
                time: msg.time 
              }
            ]
          },
          users: users
        });


      socket.to(msg.reciver).emit('recive_message', msg);
    });

    socket.on('new-chat', (data) => {
      socket.to(data.recipient).emit('new-chat', data);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
    });  

};

module.exports = socketHandler;
