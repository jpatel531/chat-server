var mongoose = require('mongoose');

exports.schema = messageSchema = mongoose.Schema({
	from: String,
	body: String,
	timestamp: Date
});

exports.model = mongoose.model('Message', messageSchema);