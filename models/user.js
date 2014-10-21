var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
	user_id: String,
	nickname: String,
	email: String
});