var express = require('express');
var router = express.Router();
var talk = require("../models/db_talk");
/* GET home page. */

var urlReg=/http:\/\/.+\s[\w\u4e00-\u9fa5]+?\s/g;  
var httpReg = /http:\/\/.+?\s/g;
router.get('/', function(req, res) {
	if(req.session.username){
			talk.getTalks().then(function(re){
				for(var v in re){
					var p = re[v];
					
 					var urlArr = re[v].text.match(urlReg);
 					console.log(urlArr);
 					for(var inner in urlArr){
 						var w = urlArr[inner];
 						var tmp = w.match(httpReg)[0];
 						var word = w.substr(tmp.length,w.length-1);
 						var replacew = '<a href="'+tmp+'">'+word+'</a>';
 						//console.log(replacew);
 						re[v].text = re[v].text.replace(w,replacew);
 						console.log(re[v].text);
 					}
				}
				console.log(re);
				res.render('index', { title: '爱·说',talks : re,user : '/images/'+req.session.username+".png"});
			},function(err){

			})
  			
  		}
  	else
  		res.redirect("/users/login");
});

module.exports = router;
