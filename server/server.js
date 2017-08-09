// library imports
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// local imports
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;


// we need to integrate socket.io into existing web server
// configure express to work with http ourselves, then do the same for socketio
var app = express();
var server = http.createServer(app);
var io = socketIO(server);              // web socket server, emitting or listening to events

app.use(express.static(publicPath));

// registers an event listener.... listening for a new connection... client to server
io.on('connection', (socket) => {
  console.log('new user connected');

  // send message to user, welcoming them to chat app
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

  // send message to all users but this one that a new user has joined
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  // listen for a join event from client
  socket.on('join', (params, callback) => {
    // check for nonempty strings
    if (!isRealString(params.name) || !isRealString(params.room)) {
      callback('Name and room name are required.');
    }
    callback();
  });

  // listen for createMessage event from client
  socket.on('createMessage', (message, callback) => {

    console.log('created message object', message);
    // once server receives message, sends it out to be displayed to chat screen?
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  // listen for createLocationMessage event from the client
  socket.on('createLocationMessage', (coords) => {
    // emit a new message event for now with a message containing the url
    // remember io.emit sends to all users
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  // listens for disconnected event from client
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// listen() is called on the express app we initialized at line 17
server.listen(port, () => {
  console.log(`server started up one port ${port}`);
});

module.exports = {app};

// socket.emit emits an event to a single connection
// io.emit emits an event to every connection
