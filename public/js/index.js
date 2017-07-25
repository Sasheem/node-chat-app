var socket = io();     // request from client to server, keep connection open

// event listener for connect event
socket.on('connect', function () {
  console.log('connected to server');
});

// event listener for disconnect event
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listen for newMessage event from server
socket.on('newMessage', function (message) {
  console.log('New message object:', message);
  // when new message comes in from server, we wanna render it to screen
  var li = jQuery('<li class=\"list-group-item\"></li>');
  li.text(`${message.from}: ${message.text}`);
  jQuery('#messages').append(li);
});

// event listener for when user submits form
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();     // cancels out the refresh page that happens autmatically when submit button clicked

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {

  });
});
