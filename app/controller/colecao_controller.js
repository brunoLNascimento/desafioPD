const serviceColecao = require('../service/colecaoService')


exports.cadastraColecao = async function(req, res){
    var body = req.body
    var colecao = await serviceColecao.colecao(body, res)

    if(colecao.length){
        return res.status(400).send({mensagem: "Coleção já existe"})
    }

    serviceColecao.criaColecao(body, res)

}

exports.buscaColecao = function(req, res){
    condicao = req.params
    serviceColecao.encontraColecaoId(condicao, res)
}

exports.encontraColecao = async function(req, res){
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
    