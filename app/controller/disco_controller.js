const serviceDisco = require('../service/discoService')
const serviceColecao = require('../service/colecaoService')
const util = require('../util/validaUtil')


exports.cadastraDisco = async function(req, res){
    var body = req.body
    
    await serviceColecao.colecao(body,function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar coleção"})
        }
        if(!response.length){
            return res.status(400).send({message: "Coleção: "+body.nomeColecao+" não está cadastrada"})
        }else{
            body.colecaoEncontrada = response[0]
        }
    })

    //body.consultaColecao = consultaColecao[0]
    var salvaDisco =  await util.validaParametrosDisco(body, res)  

    serviceDisco.criaDisco(salvaDisco, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao cadastrar disco"})
        }else{
            return res.status(200).send({
                mensagem: "Disco cadastrado com sucesso!",
                disco: response
            })
        }
    })
}

exports.buscaDisco = async function(req, res){
    condicao = req.params.id
    serviceDisco.encontraDiscoId(condicao, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhum disco encontrado"})
        }else{
            return res.status(200).send({
                mensagem: "Discos encontrados para a busca: " +response.length,
                discos: response
            })
        }
    })
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

    serviceDisco.encontraDisco(condicao, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhum disco encontrado"})
        }else{
            return res.status(200).send({
                mensagem: "Discos encontrados para a busca: " +response.length,
                discos: response
            })
        }
    })
}

exports.editaDisco = async function(req, res){
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
    
    var discoEncontrado = await serviceDisco.disco(body.idDisco, function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco!"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhum disco encontrado!"})
        }else{
             discoEncontrado = response[0]
        }
    })

    //falta verificar itens q serão salvos
    discoEncontrado.idColecao = colecaoEncontrada.ID_COLECAO
    var salvaDisco = util.validaEdicaoDisco(discoEncontrado, body)

    serviceDisco.editaDisco(salvaDisco, function(err, response){
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


