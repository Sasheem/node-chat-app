// January 1st 1970 00:00:00 am
// UTC means timezone independent
var moment = require('moment');

// var date = new Date();
// var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
// console.log(date.getMonth());
var createdAt = 1234
var date = moment(createdAt);
// date.add(1000, 'years').subtract(9, 'months');
console.log('---------------------------------');
console.log(date.format('h:mm a'));
console.log('---------------------------------');

var someTimestamp = moment().valueOf();
console.log(someTimestamp);

// 10:35 am
