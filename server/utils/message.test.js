var expect = require('expect');
var {generateMessage} = require('./message');

// all tests for generating a message function
describe('generateMessage', () => {

  // tests whether a message objected was generated correctly
  it('should generate correct message object', () => {
    // make call to generateMessage with 2 values
    // get res and store in variable
    // assert from is correct, from match
    // assert text is correct, text match
    // assert createdAt is number
    var from = 'Sasheem';
    var text = 'hey buddy';
    var message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text});
  });
});
