var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res) {
	res.json({success:200})
});

module.exports = router;
