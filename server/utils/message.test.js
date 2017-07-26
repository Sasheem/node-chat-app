var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

// all tests for generating a message function
describe('generateMessage', () => {

  // tests whether a message object was generated correctly
  it('should generate correct message object', () => {
    var from = 'Sasheem';
    var text = 'hey buddy';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});

// all tests for generating a location object
describe('generateLocationMessage', () => {

  // tests whether a current location object was generated correctly
  it('sould generate current location object', () => {
    var from = 'Sasheem';
    var latitude = 12;
    var longitude = 13;
    var url = 'https://www.google.com/maps/?q=12,13';
    var message = generateLocationMessage(from, latitude, longitude);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, url});
  });
});
