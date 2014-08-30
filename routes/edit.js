var express = require('express');
var router = express.Router();
var talk = require("../models/db_talk");
/* GET home page. */
router.get('/', function(req, res) {
	res.render("edit",{title:"编辑"});
});

router.post("/",function(req,res){
	var dateFormat = function(d){
		return d.getFullYear()+"-"+("0" + (d.getMonth() + 1)).slice(-2)+"-"+("0" + d.getDate()).slice(-2);
	}
	var item = {	
		"uid" : req.session.uid,
		"time": dateFormat(new Date()),
		"text": req.body.text
	}
	//console.log(item);
	talk.edit(item).then(function(data){
		if(data){
			res.redirect("/");
		}
	},function(err){

	});
});

module.exports = router;
