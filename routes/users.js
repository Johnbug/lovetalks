var express = require('express');
var router = express.Router();
var dbUser = require('../models/db_user');
/* GET users listing. */
router.get('/', function(req, res) {

});

router.get('/login',function(req,res){
	res.render('login',{title:'login'});
})
router.post('/login',function(req,res){
	var user = {
		username : req.body.username,
		password : req.body.password
	}

	dbUser.login(user).then(function(result){
		if(result){
			console.log(result);
			//req.session.username = result[0].username;
			
			//console.log(1);
			//console.log(req);
			
			req.session.username = result[0].username;
			req.session.uid = result[0].id;

			console.log(result[0].id);

			res.redirect("/")
		}
	},function(err){
		console.log(err);
	})
})

module.exports = router;
