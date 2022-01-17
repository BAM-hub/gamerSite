const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const connectDB = require('./config/db');
const startSocket = require('./socket/server');
const app = express();

//connect db
connectDB();

// Init middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

app.get('/', (req, res) => res.send('API running'));

// Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/games', require('./routes/api/games'));
app.use('/api/chat', require('./routes/api/chat'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => { 
    console.log(`server started on ${PORT}`);
});

startSocket();