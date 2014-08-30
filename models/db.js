var opt = {
	host : 'localhost',
	user : 'root',
	password : '1234',
	database : 'lovetalks'
}

var mysql = require('mysql');
var q     = require('q');

var pool = mysql.createPool(opt);

exports.pool = pool;

var poolPromise = function(){
	var deferred = q.defer();
	pool.getConnection(function(err,conn){
		if(err){
			deferred.reject(new Error(err));
		}else{
			deferred.resolve(conn);
		}

	})
	return deferred.promise;
};



var Conn = function(option){
	//console.log(option);
	var connection = poolPromise();

	return connection.then(function(conn){
		//console.log(1);
		var sql     = option.sql,
			params  = option.params || {},
			d       = q.defer();
		conn.query(sql,params, function(err,res){
			if(err){
				//console.log(err);
				d.reject(err);
				return;
			}else{
				//console.log(res);
				d.resolve(res);

			}
		})
		conn.release();
		return d.promise;

	},function(err){
		console.log(err);
	});

	
}

exports.Conn = Conn;

