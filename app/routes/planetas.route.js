module.exports = function(application) {
	//Inserir
	application.post('/adicionar', function(req, res) {
		application.app.controllers.planetas.adicionarPlaneta(application, req, res);
	});

	//Listar
	application.get('/listar', function(req, res) {
		application.app.controllers.planetas.listarPlanetas(application, req, res);
	});

	//Buscar por ID
	application.get('/buscar/id/:id', function(req, res) {
		application.app.controllers.planetas.buscarPlanetaId(application, req, res);
	});

	//Buscar por nome
	application.get('/buscar/nome/:nome', function(req, res) {
		application.app.controllers.planetas.buscarPlanetaNome(application, req, res);
	});

	//Deletar por ID
	application.delete('/remover/id/:id', function(req, res) {
		application.app.controllers.planetas.removerPlaneta(application, req, res);
	});
}