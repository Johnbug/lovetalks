var db = require("./db");
var Q  = require("q");

var conn = db.Conn;

function Table(table){
	this.table = table || "";
}

Table.prototype = {
	constructor : Table,
	getItemsNum : function(){
		var query = {
			sql : "select count(*) as num from "+this.table,
			params : {}
		}

		var d   = Q.defer();

		return conn(query).then(function(res){
			d.resolve(res);
			return d.promise;
		},function(err){
			d.reject(err);
		})

	},

	insertItem : function(item){

		var l = "", t = "";

		for(var i in item){
			l += (i+",");
			t += ("'"+item[i]+"',");
		}

		l = l.substr(0,l.length-1);
		t = t.substr(0,t.length-1);
		//console.log(l);
		//console.log(t);
		var query = {
			sql : "insert into "+this.table+" ("+l+") values ("+t+")",
			params : {}
		}
		//console.log(query.sql);
		var d = Q.defer();

		return conn(query).then(function(res){
			d.resolve(res);
			return d.promise;
		},function(err){
			d.reject(err);
		})
	}
}


exports.table = Table;