var socket = io();     // request from client to server, keep connection open

socket.on('connect', function () {
  console.log('connected to server');
});

socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listen for newMessage event from server
socket.on('newMessage', function (message) {
  console.log('New message object:', message);
});
