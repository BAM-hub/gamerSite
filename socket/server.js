const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');


// init sever
const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    //allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});

const room = 'test room';

io.on('connection', socket => {
  console.log(`connection by ${socket.id}`);

  socket.on('join', (id) => {
    socket.join(id);
    socket.emit('roomName', 'test room');
    console.log(io.engine.clientsCount);
    //console.log(`${id} joined on ${socket.id}`)
 });


  socket.on('send_message', msg => {
    console.log(msg);
    // console.log(io.engine.clientsCount)
    // console.log(io.of("/").adapter.sids);
    // console.log(socket.id);
    socket.to('61ba565477dddaa3ce37b9c0').emit('recive_message', msg);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });

});

const startSocket = () => {
  //start server
  const PORT = 8000 || process.env.PORT;
  httpServer.listen(PORT, () => console.log(`socket running on port ${PORT}`));
}

module.exports = startSocket;
