
const socketHandler = (socket) => {
    console.log(`connection by ${socket.id}`);

    socket.on('join', (id) => {
      socket.join(id);
      console.log(`${id} joined`);
      //console.log(io.engine.clientsCount);
      //console.log(`${id} joined on ${socket.id}`)
   });
  
  
    socket.on('send_message', msg => {
      console.log(msg);
      // console.log(io.engine.clientsCount)
      // console.log(io.of("/").adapter.sids);
      // console.log(socket.id);
      socket.to(msg.reciver).emit('recive_message', msg);
    });
  
    socket.on('disconnect', () => {
      console.log('disconnect');
    });  

};

module.exports = socketHandler;
