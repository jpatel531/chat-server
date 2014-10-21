var mongoose = require('mongoose');

exports.schema = messageSchema = mongoose.Schema({
	from: String,
	body: String,
	timeStamp: Date
});

exports.model = mongoose.model('Message', messageSchema);