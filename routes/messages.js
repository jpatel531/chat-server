var express = require('express');
var router = express.Router();

var pusher = require('../config/pusherConfig');

/* GET home page. */
router.post('/', function(req, res) {
	// console.log(req.body)
	pusher.trigger('chat-channel', 'new-message', req.body);
	res.json({success:200})
});

module.exports = router;
