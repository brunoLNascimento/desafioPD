const serviceDisco = require('../service/colecaoService')

exports.buscaColecao = function(req, res){
    condicao = req.params
    serviceDisco.encontraColecaoId(condicao, res)
}

exports.encontraColecao = async function(req, res){
    var page = req.params.page
    var limit = 50

    if(!req.params.texto) var texto = ""
    else var texto = req.params.texto

    var condicao = { 
        page: page,
        limit: limit,
        skip: page * limit,
        texto: '%' +texto+ '%'
    }

    serviceDisco.encontraColecao(condicao, res)
}
    