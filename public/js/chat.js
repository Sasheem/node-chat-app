var socket = io();     // request from client to server, keep connection open

// scroll to bottom if user is close to bottom
function scrollToBottom () {

  // Selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  var totalHeights = clientHeight + scrollTop
  + newMessageHeight + lastMessageHeight;

  if (totalHeights >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

// event listener for connect event
socket.on('connect', function () {
  console.log('connected to server');
  var params = jQuery.deparam(window.location.search);

  // client emits event to let server know to start the process of setting
  // up a room
  socket.emit('join', params, function (err) {
    if (err) {
      // success
      // prompt user to re enter valid form
      alert(err);                    // could call a modal from foundation.. bootstrap etc.
      window.location.href = '/';
    } else {
      // failure
      // send user to chat room
      console.log('no error found');
    }
  });
});

// event listener for disconnect event
socket.on('disconnect', function () {
  console.log('disconnected from server');
});

// listen for newMessage event from server
socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// listen for createLocationMessage event from the server
socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = jQuery('#location-message-template').html();     // gets the inner html back
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  jQuery('#messages').append(html);
  scrollToBottom();
});

// event listener for when user submits form
jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();     // cancels out the refresh page that happens autmatically when submit button clicked
  var messageTextbox = jQuery('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function() {
    messageTextbox.val('');
  });
});

// set up a click listener for the send-location button
var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  // make sure user has access to geolocation api
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled', 'disabled').text('Sending location...');

  // now fetch location, or alert error if unable to fetch
  navigator.geolocation.getCurrentPosition(function (position) {
    // success case
    locationButton.removeAttr('disabled').text('Send location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});
