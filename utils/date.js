const date = new Date();

const today = date.toDateString().split(' ');

today.pop();

const time = date
.toTimeString()
.split(' ')[0]
.split(':')[0];

const checkTime = (time > 5 && time < 17) ? 'day' : 'night'

console.log(date.toTimeString())

module.exports = checkTime;