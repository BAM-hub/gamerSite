const express = require('express');
const { createServer } = require('http');
const server = require('socket.io');


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



io.on('connection', socket => {
  console.log('conneted user');
});
