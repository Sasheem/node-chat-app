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

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



// listen() is called on the express app we initialized at line 17
server.listen(port, () => {
  console.log(`server started up one port ${port}`);
});

module.exports = {app};
