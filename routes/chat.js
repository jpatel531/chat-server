var express = require('express');
var router = express.Router();
var Chat = require('../models/chat');
var User = require('../models/user').model;
var _ = require('underscore');
var pusher = require('../config/pusherConfig');

/* GET home page. */
router.post('/:firstUser/:secondUser/messages', function(req, res) {
	console.log(req.body);
	var ids = [req.params.firstUser, req.params.secondUser];
	var path = ids.join("/");

	Chat.findOne({path: path}, function(err, chat){
		chat.messages.push(req.body)
		chat.save(function(err, instance){
			console.log(instance);
			pusher.trigger('chat-channel', 'new-message', req.body);
			res.json({success:200})
		});
	});
});


router.get('/:firstUser/:secondUser/messages', function(req, res) {

	var ids = [req.params.firstUser, req.params.secondUser];
	var path = ids.join("/");

	Chat.findOne({path: path}, function(err, chat){
		
		res.json(chat.messages);

	});
});



router.post('/new', function(req, res){
	var emails = req.body.users
	User.find({email: {$in: emails}}, function(err, users){
		var path = _.pluck(users, "_id").join("/")
		Chat.findOrCreate({path: path}, {users: users}, function(err, chat, created){
			var ids = _.pluck(chat.users, "_id")
			res.json(ids);
		});
	});

});

module.exports = router;
