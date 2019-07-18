/* importar o mongodb */
var mongo = require('mongodb');
let objectId = require('mongodb').ObjectId;

var connMongoDB = function() {
	var db = new mongo.Db(
		'planeta_api',
		new mongo.Server(
			'localhost',
			27017,
			{}
		),
		{}
	);
	return db;
}

module.exports.connection = function() {
	return connMongoDB;
}

module.exports.isValid = function(id) {
	return objectId.isValid(id);
}

module.exports.objectId = function(id) {
	return objectId(id);
}