var db = require("./db");
var Q  = require("q");
var conn = db.Conn;


/*
	todo : 
	filter infomation to avoid SQL
*/




var login = function(user){
	var d = Q.defer();
	var query = {
		sql : "select * from user where username='"+user.username+"' and password='"+user.password+"'",
		params : {}
	};

	return conn(query).then(function(res){
		d.resolve(res);
		return d.promise;
	},function(err){
		d.reject(err);
	})

}	

exports.login = login;
