// library imports
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// local imports
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

// we need to integrate socket.io into existing web server
// configure express to work with http ourselves, then do the same for socketio
var app = express();
var server = http.createServer(app);
var io = socketIO(server);              // web socket server, emitting or listening to events
var users = new Users();

app.use(express.static(publicPath));

// registers an event listener.... listening for a new connection... client to server
io.on('connection', (socket) => {
  console.log('new user connected');

  // listen for a join event from client
  socket.on('join', (params, callback) => {
    // check for nonempty strings
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    socket.join(params.room);            // join a room
    users.removeUser(socket.id);         // remove user from any previous potential rooms
    users.addUser(socket.id, params.name, params.room);

    // emit an event to everyone in the chat room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // send message to user, welcoming them to chat app
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App!'));

    // send message to all users but this one that a new user has joined
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

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

    var user = users.removeUser(socket.id);
    console.log('user disconnected');

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    } 
  });
});

// listen() is called on the express app we initialized at line 17
server.listen(port, () => {
  console.log(`server started up one port ${port}`);
});

module.exports = {app};


// NOTES *********************************************************

// io.emit sends something to every user
// socket.broadcast.emit sends to every user on socket server, expect sending user
// socket.emit sends event to one user
// socket.leave(params.room) will kick user out of the room

// before/after when adding rooms into the mix
// io.emit -> io.to(params.room).emit
// socket.broadcast.emit -> socket.broadcast.to(params.room).emit
// socket.emit ->
