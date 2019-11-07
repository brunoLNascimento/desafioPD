const serviceColecao = require('../service/colecaoService')
const util = require('../util/validaUtil')

exports.cadastraColecao = async function(req, res){
    var body = req.body

    //todo
    let colecao = util.validaParametrosDisco(body)
    await serviceColecao.colecao(body, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco!"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhuma coleção encontrada!"})
        }else{
            colecao = response
        }
    })
    //TODO VALIDA COLECAO

    serviceColecao.criaColecao(colecao, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco!"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhuma coleção encontrada!"})
        }else{
            return res.status(200).send({
                mensagem: "Colecao criada com sucesso!",
                colecao: response
            })
        }
    })

}

exports.buscaColecao = function(req, res){
    condicao = req.params
    serviceColecao.encontraColecaoId(condicao, function(err, response){
        if (error) {
            console.error(error)
            return res.status(500).send({mensagem: "Erro ao consultar coleção"})
        }else if(!results.length){
            return res.status(400).send({mensagem: "Nenhuma coleção encontrado"})
        }else{
            return res.status(200).send(results)
        }
    })

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

    serviceColecao.encontraColecao(condicao, function(err, response){
        if (err) {
            return res.status(500).send({mensagem: "Erro ao consultar coleção"})
        }else if(!response.length){
            return res.status(400).send({mensagem: "Nenhum coleção encontrado"})
        }else{
            return res.status(200).send({
                mensagem: "Coleçãoo encontrada para a busca: " +response.length,
                coleções: response
            })
        }
    })
}

exports.editaColecao = async function(req, res){
    let body = req.body
    
    var colecaoEncontrada = await serviceColecao.colecao(body, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar coleção"})
        }
        if(!response.length){
            return res.status(400).send({message: "Coleção: "+body.nomeColecao+" não está cadastrada"})
        }else{
            colecaoEncontrada = response[0]
        }
    })
    
    var salvaColecao = util.validaEdicaoColecao(discoEncontrado, body)

    serviceDisco.editaColecao(salvaColecao, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao editar disco!"})
        }
        if(!response){
            return res.status(400).send({message: "Não foi possível editar disco!"})
        }else{
            return res.status(200).send({message: "Disco atualizado com sucesso!"})
        }
    })
}

exports.removeColecao = async function(req, res){
    var idColecao = req.params.id
    
    //todo
    serviceColecao.encontraColecaoId(idColecao, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar Coleção!"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhum coleção encontrado!"})
        }else{
            serviceColecao.removeColecao(idColecao, function(err, response){
                if(err){
                    return res.status(500).send({mensagem: "Erro ao editar Coleção!"})
                }
                if(!response){
                    return res.status(400).send({message: "Não foi possível editar Coleção!"})
                }else{
                    return res.status(200).send({message: "Coleção deletado com sucesso!"})
                }
            })
        }
    })
}