const disco = require('../controller/disco_controller')

module.exports = function(server) {	
	//rota cadastra disco
	server.post('/cadastraDisco/', disco.cadastraDisco)

	//rota busca disco por id
	server.get('/buscaDiscoId/:id', disco.buscaDisco)

	//rota busca todos disco ou todos por nome disco, limite de 50 itens por pagina
	server.get('/buscaDisco/:page/:texto?', disco.encontraDisco)

	//rota edita disco
	server.put('/editaDisco/', disco.editaDisco)

	//rota remove disco, delete logico
	server.delete('/removeDisco/:id', disco.removeDisco)
}