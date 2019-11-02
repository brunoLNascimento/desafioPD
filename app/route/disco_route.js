const disco = require('../controller/disco_controller')

module.exports = function(server) {	
	server.post('/cadastraDisco/', disco.cadastraDisco)
	server.get('/buscaDiscoId/:id', disco.buscaDisco)
	server.get('/buscaDisco/:page/:texto?', disco.encontraDisco)
}