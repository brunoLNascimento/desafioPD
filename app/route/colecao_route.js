const colecao = require('../controller/colecao_controller')

module.exports = function(server) {	
	server.post('/cadastraColecao/', colecao.cadastraColecao)
	server.get('/buscaColecaoId/:id', colecao.buscaColecao)
	server.get('/buscaColecao/:page/:colecao?', colecao.encontraColecao)
}