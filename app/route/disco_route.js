const disco = require('../controller/disco_controller')

module.exports = function(server) {	
	server.get('/disco/:id', disco.buscaDisco)
}