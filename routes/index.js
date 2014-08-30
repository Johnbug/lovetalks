var express = require('express');
var router = express.Router();
var talk = require("../models/db_talk");
/* GET home page. */
router.get('/', function(req, res) {
	if(req.session.username){
			talk.getTalks().then(function(re){
				
				console.log(re);
				res.render('index', { title: '爱·说',talks : re});
			},function(err){

			})
  			
  		}
  	else
  		res.redirect("/users/login");
});

module.exports = router;