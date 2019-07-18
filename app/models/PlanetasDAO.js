var convertUtf8 = require('utf8');

function PlanetasDAO(connection) {
	this._connection = connection();
}

PlanetasDAO.prototype.listarPlanetas = function(callback) {
	this._connection.open(function(err, mongoclient) {
		mongoclient.collection("planetas", function(err, collection) {
			collection.find().toArray(function(err, results) {
				mongoclient.close();
				if (err) {
					callback(err);
				} else {
					callback(results);
				}
			});
		});
	});
}

PlanetasDAO.prototype.adicionarPlaneta = function(planeta, callback) {
	this._connection.open(function(err, mongoclient) {
		mongoclient.collection('planetas', function(err, collection) {
			collection.insert(planeta, function(err, records) {
				if (err) {
					callback(err);
				} else {
					callback(records);
				}
				mongoclient.close();
			});
		});
	});
}

//Buscar por ID
PlanetasDAO.prototype.buscarPlanetaId = function(planetaId, callback) {
	this._connection.open(function(err, mongoclient) {
		mongoclient.collection('planetas', function(err, collection) {
			collection.find(planetaId).toArray(function(err, records) {
					if (err) {
						callback(err);
					} else {
						callback(records);
					}
					mongoclient.close();
				}
			);
		});
	});
}

//Buscar por nome
PlanetasDAO.prototype.buscarPlanetaNome = function(planetaNome, callback) {
	this._connection.open(function(err, mongoclient) {
		mongoclient.collection('planetas', function(err, collection) {
			collection.find({'nome': {'$regex': '^'+convertUtf8.decode(planetaNome), '$options' : 'i'}}).toArray(function(err, records) {
					if (err) {
						callback(err);
					} else {
						callback(records);
					}
					mongoclient.close();
				}
			);
		});
	});
}

//Deletar por ID
PlanetasDAO.prototype.removerPlaneta = function(planetaId, callback) {
	this._connection.open(function(err, mongoclient) {
		mongoclient.collection('planetas', function(err, collection) {
			collection.deleteOne({'_id': planetaId}, function(err, records) {
					if (err) {
						callback(err);
					} else {
						callback(records);
					}
					mongoclient.close();
				}
			);
		});
	});
}

module.exports = function() {
	return PlanetasDAO;
}