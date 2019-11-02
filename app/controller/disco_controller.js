const serviceDisco = require('../service/discoService')
const util = require('../util/validaUtil')


exports.cadastraDisco = function(req, res){
    var body = req.body
    var salvaDisco =  util.validaParametrosDisco(body, res)
    console.log(salvaDisco)

    serviceDisco.criaDisco(salvaDisco, res)

}

exports.buscaDisco = async function(req, res){
    condicao = req.params.id
    serviceDisco.encontraDiscoId(condicao, res)
}

exports.encontraDisco = async function(req, res){
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

    serviceDisco.encontraDisco(condicao, res)
}
