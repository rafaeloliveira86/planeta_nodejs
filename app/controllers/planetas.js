var request = require('request');

function buscarQtdFilmes(planetaNome, callback) {
	request('https://swapi.co/api/planets/?search='+planetaNome, function(err, res, body) {
		let result = JSON.parse(body);
		if (result.results.length > 0) {
			callback(result.results[0].films.length);
		} else {
			callback(0);
		}
	});
}

//Listar Todos
module.exports.listarPlanetas = function (application, req, res) {
	let connection = application.config.dbConnection.connection();
	let PlanetasDAO = new application.app.models.PlanetasDAO(connection);
	PlanetasDAO.listarPlanetas(function(result) {
		res.json(result);
	});
}

//Inserir
module.exports.adicionarPlaneta = function(application, req, res) {
	var dadosForm = req.body;
	req.assert('nome', 'O campo (Nome) não pode ser vazio').notEmpty();
	req.assert('clima', 'O Campo (Clima) não pode ser vazio').notEmpty();
	req.assert('terreno', 'O campo (Terreno) não pode ser vazio').notEmpty();
	var erros = req.validationErrors();
	if (erros) {
		res.json(erros);
		return;
	}
	var connection = application.config.dbConnection.connection();
	var PlanetasDAO = new application.app.models.PlanetasDAO(connection);
	PlanetasDAO.buscarPlanetaNome(dadosForm.nome, function(result) {
		if (result[0] === undefined) {
			buscarQtdFilmes(dadosForm.nome, function(qtdFilmes) {
				dadosForm.qtdFilmes = qtdFilmes;
				PlanetasDAO.adicionarPlaneta(dadosForm, function(result) {
					if (result.result.ok === 0) {
						res.json({'Error': 'Não foi possível adicionar o registro.'});
					} else {
						res.json({'Success': 'Planeta adicionado com sucesso!'});
					}
				});
			});
		} else {
			res.json({'Error': 'O planeta informado já existe na base de dados.'});
		}
	});
}

//Buscar por ID
module.exports.buscarPlanetaId = function (application, req, res) {
	let planetaId = req.params.id
	let connection = application.config.dbConnection;
	let isValid = connection.isValid(planetaId);
	if (isValid) {
		let con = connection.connection();
		let convert = connection.objectId(planetaId);		
		let PlanetasDAO = new application.app.models.PlanetasDAO(con);
		PlanetasDAO.buscarPlanetaId(convert, function(result) {
			res.json(result);
		});
	} else {
		res.json({'Error': 'O ID informado é inválido.'})
	}
}

//Buscar por nome
module.exports.buscarPlanetaNome = function (application, req, res) {
	let planetaNome = req.params.nome;
	//buscarQtdFilmes(planetaNome);
	let connection = application.config.dbConnection;
	let con = connection.connection();		
	let PlanetasDAO = new application.app.models.PlanetasDAO(con);
	PlanetasDAO.buscarPlanetaNome(planetaNome, function(result) {
		if (result[0] === undefined) {
			res.json({'Error': 'Planeta informado não encontrado.'});
		} else {
			res.json(result[0]);
		}
	});
}

//Deletar por ID
module.exports.removerPlaneta = function (application, req, res) {
	let planetaId = req.params.id;
	let connection = application.config.dbConnection;
	let isValid = connection.isValid(planetaId);
	if (isValid) {
		let con = connection.connection();
		let convert = connection.objectId(planetaId);		
		let PlanetasDAO = new application.app.models.PlanetasDAO(con);
		PlanetasDAO.removerPlaneta(convert, function(result) {
			res.json({'Success': 'Planeta removido com sucesso!'});
		});
	} else {
		res.json({'Error': 'O ID informado é inválido.'})
	}
}
