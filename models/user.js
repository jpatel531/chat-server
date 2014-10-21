var mongoose = require('mongoose');

exports.schema = userSchema = mongoose.Schema({
	user_id: String,
	nickname: String,
	email: String
});

exports.model = mongoose.model('User', userSchema);