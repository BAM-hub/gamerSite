const express = require('express');
const { Socket } = require('socket.io-client');
const connectDB = require('./config/db');
const startSocket = require('./socket/server');
const app = express();

//connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log(`server started on ${PORT}`);
});

startSocket();