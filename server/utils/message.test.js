var expect = require('expect');
var {generateMessage} = require('./message');

// all tests for generating a message function
describe('generateMessage', () => {

  // tests whether a message objected was generated correctly
  it('should generate correct message object', () => {
    var from = 'Sasheem';
    var text = 'hey buddy';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
