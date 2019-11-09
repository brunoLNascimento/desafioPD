const colecao = require('../controller/colecao_controller')

module.exports = function(server) {	
	//rota cria colecao
	server.post('/cadastraColecao/', colecao.cadastraColecao)

	//rpta consulta colecao por id
	server.get('/buscaColecaoId/:id', colecao.buscaColecao)

	//rota consulta todas as colecoes ou colecao por nome, limite de 50 itens por página
	server.get('/buscaColecao/:page/:colecao?', colecao.encontraColecao)

	//rota para atualizar uma colecao
	server.put('/editaColecao/', colecao.editaColecao)

	//rota pra deletar uma colecao *delete logico
	server.delete('/removeColecao/:idColecao', colecao.removeColecao)
}