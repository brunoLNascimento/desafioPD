const serviceDisco = require('../service/discoService')
const serviceColecao = require('../service/colecaoService')
const util = require('../util/validaUtil')


exports.cadastraDisco = async function(req, res){
    var body = req.body
    
    let colecao = await serviceColecao.colecao(body, res) 
    if(!colecao.length){
        return res.status(400).send({mensagem: "Coleção não foi encontrada"})
    }

    var salvaDisco =  await util.validaParametrosDisco(body, res)  
    if(salvaDisco.statusCode) return false

    serviceDisco.criaDisco(salvaDisco, res)
}

exports.buscaDisco = function(req, res){
    condicao = req.params.id
    serviceDisco.encontraDiscoId(condicao, res)
}

exports.encontraDisco = function(req, res){
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

exports.editaDisco = async function(req, res){
    let body = req.body

    if(!body.idDisco){
        return res.status(400).send({mensagem: "Id disco é um campo obrigatório"}) 
    }
    
    let colecaoEncontrada = await serviceColecao.colecao(body, res)

    if(!colecaoEncontrada.length){
        return res.status(400).send({mensagem: "Coleção não encontrada!"}) 
    }else{
        colecaoEncontrada = colecaoEncontrada[0]
    }
    
    let discoEncontrado = await serviceDisco.disco(body.idDisco,res)
    let salvaDisco = util.validaEdicaoDisco(discoEncontrado, body)

    serviceDisco.editaDisco(salvaDisco, res) 
}


exports.removeDisco = async function(req, res){
    var idDisco = req.params.id
    
    if(!body.idDisco){
        return res.status(400).send({mensagem: "Id disco é um campo obrigatório"}) 
    }
    
    await serviceDisco.disco(idDisco, res)
    serviceDisco.removeDisco(idDisco,res)
                
}