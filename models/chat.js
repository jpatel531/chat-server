var mongoose = require('mongoose');
var userSchema = require('./user').schema;
var messageSchema = require('./message').schema;
var findOrCreate = require('mongoose-findorcreate')

var chatSchema = mongoose.Schema({
	users: [userSchema],
	path: String,
	messages: [messageSchema]
});

chatSchema.plugin(findOrCreate);

module.exports = mongoose.model('Chat', chatSchema);

