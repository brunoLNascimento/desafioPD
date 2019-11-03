const serviceDisco = require('../service/discoService')
const serviceColecao = require('../service/colecaoService')
const util = require('../util/validaUtil')


exports.cadastraDisco = async function(req, res){
    var body = req.body
    var consultaColecao = await serviceColecao.colecao(body, res)
    
    if(!consultaColecao.length){
        return res.status(400).send({message: "Coleção: "+body.nomeColecao+" não está cadastrada"})
    }

    body.consultaColecao = consultaColecao[0]
    var salvaDisco =  await util.validaParametrosDisco(body, res)   
    
    if(salvaDisco.statusCode) return false

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
