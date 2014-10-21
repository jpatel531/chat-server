var express = require('express');
var router = express.Router();
var User = require('../models/user');
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
	console.log(currentUser)
	var auth = pusher.authenticate(socketId, channel, currentUser);
	res.send(auth);
});

module.exports = router;
