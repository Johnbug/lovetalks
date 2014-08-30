var db = require("./db");
var easy = require("./db_easy");
var talk = new easy.table("talk");
var Q  = require("q");

var conn = db.Conn;

var edit = function(item){
	var d = Q.defer();
	//console.log(talk);
	return talk.insertItem(item).then(function(res){
		d.resolve(res);
		return d.promise;
	},function(err){
		d.reject(err);
	});
}

var getTalks = function(){
	var d = Q.defer();
	var query = {
		sql : "select tid,uid,date_format(time,'%Y-%m-%d') as time, text from talk order by time desc, tid desc",
		params : {}
	}

	return conn(query).then(function(res){
		//console.log(res);
		d.resolve(res);
		return d.promise;
	},function(err){
		d.reject(err);
	})
}

exports.edit = edit;
exports.getTalks = getTalks;