var express = require('express');
var router = express.Router();
var Chat = require('../models/chat');
var User = require('../models/user').model;
var _ = require('underscore');
var pusher = require('../config/pusherConfig');

/* GET home page. */
router.post('/:firstUser/:secondUser/messages', function(req, res) {

	var ids = [req.params.firstUser, req.params.secondUser];
	// console.log(users);

	// User.find({_id: {$in: ids}}, function(err, users){
	// 	console.log(users);
	// 	Chat.findOne({users: users}, function(err, chat){
	// 		console.log(chat);
	// 	});
	// });


	// Chat.findOne({users: {$in: users}}, function(err, chat){
	// 	if (err) throw err ;
	// 	chat.messages.push(req.body)
	// 	chat.save(function(err, instance){
	// 		console.log(instance);
	// 		pusher.trigger('chat-channel', 'new-message', req.body);
	// 		res.json({success:200})
	// 	});
	// });



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
