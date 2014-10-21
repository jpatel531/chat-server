var express = require('express');
var router = express.Router();
var User = require('../models/user').model;
var pusher = require('../config/pusherConfig');


var currentUser = {};

/* GET home page. */
router.post('/new_signup', function(req, res) {
	console.log(req.body)
	User.findOne({user_id: req.body.user_id}, function(err, user){
		currentUser = user
		if (!user){
			var newUser = new User({user_id: req.body.user_id, nickname: req.body.nickname, email: req.body.email})
			newUser.save(function(err, instance){
				res.json({success:200})
			});
		} else {
			res.json({success: 200})
		}
	});
});

router.post('/auth', function(req, res){
	var socketId = req.body.socket_id;
	var channel = req.body.channel_name;
	// console.log(currentUser)

	var presenceData = {
		user_id: currentUser.user_id,
		user_info: {
			nickname: currentUser.nickname,
			email: currentUser.email
		}
	}

	// var pusherUser = {}
	// pusherUser.user_id = currentUser.user_id
	// pusherUser.user_info = {email: currentUser.email, nickname: currentUser.nickname}

	console.log(presenceData)
	var auth = pusher.authenticate(socketId, channel, presenceData);
	res.send(auth);
});

module.exports = router;
