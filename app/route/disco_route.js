const disco = require('../controller/disco_controller')

module.exports = function(server) {	
	server.get('/buscaDiscoId/:id', disco.buscaDisco)
	server.get('/buscaDisco/:page/:texto?', disco.encontraDisco)
}