const serviceColecao = require('../service/colecaoService')
const util = require('../util/validaUtil')

exports.cadastraColecao = async function(req, res){
    var body = req.body

    let colecao = util.validaParametrosColecao(body, res)
    if(colecao.statusCode) {
        return false
    }

    buscaColecao = await serviceColecao.colecao(body, res)
    serviceColecao.criaColecao(colecao, res)
}

exports.buscaColecao = function(req, res){
    condicao = req.params
    serviceColecao.encontraColecaoId(condicao, res)

}

exports.encontraColecao = function(req, res){
    var page = req.params.page
    var limit = 50

    if(!req.params.colecao) var colecao = ""
    else var colecao = req.params.colecao

    var condicao = { 
        page: page,
        limit: limit,
        skip: page * limit,
        colecao: '%' +colecao+ '%'
    }

    serviceColecao.encontraColecao(condicao, res)
}

exports.editaColecao = async function(req, res){
    let body = req.body
    
    let colecaoEncontrada = await serviceColecao.colecao(body, res)
    colecaoEncontrada = colecaoEncontrada[0]
    util.validaEdicaoColecao(colecaoEncontrada, body)
    
    
    var salvaColecao = util.validaEdicaoColecao(colecaoEncontrada, body)
    salvaColecao.idColecao = body.idColecao

    serviceColecao.editaColecao(salvaColecao, res)
}

exports.removeColecao = async function(req, res){
    var params = req.params

    colecaoEncontrada = await serviceColecao.colecao(params, res)

    if(!colecaoEncontrada.length){
        return res.status(400).send({mensagem: "Coleção não foi encontrada"})
    }
    serviceColecao.removeColecao(params, res)
}