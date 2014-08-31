var express = require('express');
var router = express.Router();
var talk = require("../models/db_talk");
/* GET home page. */

var urlReg=/^((http|https|ftp):\/\/)?(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/g;    

router.get('/', function(req, res) {
	if(req.session.username){
			talk.getTalks().then(function(re){
				for(var v in re){
					var p = re[v];
					
 					var urlArr = re[v].text.match(urlReg);
 					//console.log(urlArr);
 					for(var inner in urlArr){
 						var w = urlArr[inner];
 						//console.log(w);
 						var replacew = '<a href="'+w+'">'+w+'</a>';
 						//console.log(replacew);
 						re[v].text = re[v].text.replace(w,replacew);
 						//console.log(re[v].text);
 					}
				}
				res.render('index', { title: '爱·说',talks : re,user : '/images/'+req.session.username+".png"});
			},function(err){

			})
  			
  		}
  	else
  		res.redirect("/users/login");
});

module.exports = router;
