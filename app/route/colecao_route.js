const colecao = require('../controller/colecao_controller')

module.exports = function(server) {	
	server.get('/buscaColecaoId/:id', colecao.buscaColecao)
	server.get('/buscaColecao/:page/:texto?', colecao.encontraColecao)
}