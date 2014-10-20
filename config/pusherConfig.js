var Pusher = require("pusher");

if (!process.env.PUSHER_ID) {
	var secrets = require('./secrets');
}

var pusher = new Pusher({
  appId: process.env.PUSHER_ID || secrets.pusherId,
  key: process.env.PUSHER_KEY || secrets.pusherKey,
  secret: process.env.PUSHER_SECRET || secrets.pusherSecret
});

module.exports = pusher;