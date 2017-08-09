var isRealString = (str) => {
  // returns true for any string, and false for any nonstring value
  // returns trim the string and also check the length is greater than 0
  return typeof str === 'string' && str.trim().length > 0;
};

module.exports = {isRealString};
