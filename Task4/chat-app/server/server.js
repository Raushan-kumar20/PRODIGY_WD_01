// Import necessary modules
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const chatServer = require('./websocket/chatServer');

const app = express();
const server = http.createServer(app);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/chat-app', { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware
app.use(express.json());

// Routes
app.use('/auth', require('./routes/auth'));
app.use('/chat', require('./routes/chat'));

// Start WebSocket server
chatServer(server);

// Start the server
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
