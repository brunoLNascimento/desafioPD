const moment = require('moment')

exports.validaParametrosDisco = function(body, res){
    if(!body.nomeDisco){
       return res.status(400).send({message: "Nome do Disco é um campo obrigatório"})
    }

    var disco = {
        NOME_DISCO: body.nomeDisco,
        DATA_LANCAMENTO: body.dataLancamento ? body.dataLancamento: moment().format('DD/MM/YYYY'),
        DESC_DISCO: body.descDisco ? body.descDisco: "-",
        ID_COLECAO: body.idColecao,
        ATIVO: 1,
    }

    return disco
}

exports.validaParametrosColecao = function(body, res){
    if(!body.nomeColecao){
        return res.status(400).send({message: "Nome do Disco é um campo obrigatório"})
    }

    var colecao = {
        nomeColecao: body.nomeColecao,
        dataCriacao: moment().format('DD-MM-YYYY'),
        ativo: "1"
    }

    return colecao
}

exports.validaEdicaoDisco = function(discoEncontrado, body){
    var salvaDisco = {}
    salvaDisco.idDisco = body.idDisco
    
    //monta query para atualizar disco
    if(body.nomeDisco && body.nomeDisco != discoEncontrado.NOME_DISCO ){
        salvaDisco.NOME_DISCO = body.nomeDisco
    }else{
        salvaDisco.NOME_DISCO = discoEncontrado.NOME_DISCO
    }

    if(body.descDisco && body.descDisco != discoEncontrado.DESC_DISCO ){
        salvaDisco.DESC_DISCO = body.descDisco
    }else{
        salvaDisco.DESC_DISCO = discoEncontrado.DESC_DISCO
    }

    if(body.idColecao && body.idColecao != discoEncontrado.ID_COLECAO ){
        salvaDisco.ID_COLECAO = body.idColecao
    }else{
        salvaDisco.ID_COLECAO = discoEncontrado.ID_COLECAO
    }

    if(body.dataLancamento && body.dataLancamento != discoEncontrado.DATA_LANCAMENTO ){
        salvaDisco.DATA_LANCAMENTO = body.dataLancamento
    }else{
        salvaDisco.DATA_LANCAMENTO = discoEncontrado.DATA_LANCAMENTO
    }

    return salvaDisco
}


exports.validaEdicaoColecao = function(discoEncontrado, body){
    var colecao = {}

    //monta query para atualizar disco
    if(body.nomeColecao && body.nomeColecao != discoEncontrado.NOME_COLECAO ){
        colecao.NOME_COLECAO = body.nomeColecao
    }else{
        colecao.NOME_COLECAO = discoEncontrado.NOME_COLECAO
    }

    if(body.dataLancamento && body.dataLancamento != discoEncontrado.DATA_CRIACAO ){
        colecao.DATA_CRIACAO = body.dataLancamento
    }else{
        colecao.DATA_CRIACAO = discoEncontrado.DATA_CRIACAO
    }

    return colecao
}