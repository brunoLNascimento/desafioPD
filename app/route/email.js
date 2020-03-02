const email = require('../controller/email')

module.exports = function(server) {	
	//rota cadastra disco
    server.post('/envia/', email.envia)
}