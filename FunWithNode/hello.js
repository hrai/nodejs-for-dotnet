console.log('hello world');

var x = {
  name: 'hi',
  place: 'world',
};

console.log(x.name + ' ' + x.place);

var msgs = require('./msgs');
var msg = new msgs();
console.log(msg.first);

var logger = require('./logger');
logger.log('this is from the logger');

var _ = require('underscore');
