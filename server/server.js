// create express app
// configure express static middleware
// app.listen to start server on port 3000
// callback to say server is up on port 3000
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

  // socket.emit from Admin text Welcome to Chat App
  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to Chat App',
    createdAt: new Date().getTime()
  });

  // socket.broadcast.emit from Admin text New user joined
  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New user joined',
    createdAt: new Date().getTime()
  });

  // listen for createMessage event from client
  socket.on('createMessage', (message) => {

    console.log('created message object', message);
    // once server receives message, sends it out to be displayed to chat screen?
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });

    // emits to everyone but this socket
    // socket.broadcast.emit('newMessage', {
    //   from: message.from,
    //   text: message.text,
    //   createdAt: new Date().getTime()
    // });
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
