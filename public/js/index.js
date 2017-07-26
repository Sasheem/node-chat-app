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

// listen for createLocationMessage event from the server
socket.on('newLocationMessage', function (message) {
  var li = jQuery('<li class=\"list-group-item\"></li>');
  // target set to _blank will open link in new tab
  var anchor = jQuery('<a target="_blank">My current location</a>');

  li.text(`${message.from}: `);           // helps prevent anyting trying to inject malicous code
  anchor.attr('href', message.url);       // this one too
  li.append(anchor);
  jQuery('#messages').append(li);
});

// event listener for when user submits form
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();     // cancels out the refresh page that happens autmatically when submit button clicked

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function() {
    // do nothing, function arg needs to be here?
  });
});

// set up a click listener for the send-location button
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  // make sure user has access to geolocation api
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  // now fetch location, or alert error if unable to fetch
  navigator.geolocation.getCurrentPosition(function (position) {
    // success case
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location');
  });
});
