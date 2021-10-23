const express = require('express');
const { createServer } = require('http');
const server = require('socket.io');

const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers 
} = require('./utils/users');

// init sever
const app = express();
const httpServer = createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
});


module.exports =  function startSocket() {
  //start server
  const PORT = 8000 || process.env.PORT;
  httpServer.listen(PORT, () => console.log(`socket running on port ${PORT}`));
};


const room = 'test room';
const userName = 'bam';

io.on('connection', (socket) => {
  console.log('conneted user');
  socket.on('join', () => {
    socket.join(room);
    console.log('user joined');
  });
  socket.emit('roomName', room);

  socket.on('message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('message', msg);
  });
});
