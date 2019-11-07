const moment = require('moment')

exports.validaParametrosDisco = function(body, res){
    if(!body.nomeDisco){
        return res.status(400).send({message: "Nome do Disco é um campo obrigatório"})
    }

    if(!body.descDisco){
        return res.status(400).send({message: "Descrição do Disco é um campo obrigatório"})
    }

    if(!body.nomeColecao){
        return res.status(400).send({message: "Descrição do Disco é um campo obrigatório"})
    }

    var disco = {
        NOME_DISCO: body.descDisco,
        DESC_DISCO: body.nomeDisco,
        DATA_LANCAMENTO: moment().format('YYYY-MM-DD'),
        CARACTERISTICAS: body.caracteriscaDisco,
        ID_COLECAO: body.consultaColecao.ID_COLECAO,
        ATIVO: 1,
    }

    return disco
}


exports.validaEdicaoDisco = function(discoEncontrado, body){
    var salvaDisco = {}

    //monta query para atualizar disco
    if(body.nomeDisco && body.nomeDisco != discoEncontrado.nomeDisco ){
        salvaDisco.NOME_DISCO = body.nomeDisco
    }else{
        salvaDisco.NOME_DISCO = discoEncontrado.NOME_DISCO
    }

    if(body.descDisco && body.descDisco != discoEncontrado.DESC_DISCO ){
        salvaDisco.DESC_DISCO = body.descDisco
    }else{
        salvaDisco.DESC_DISCO = discoEncontrado.DESC_DISCO
    }

    if(body.caracteriscaDisco && body.caracteriscaDisco != discoEncontrado.CARACTERISTICAS ){
        salvaDisco.CARACTERISTICAS = body.caracteriscaDisco
    }else{
        salvaDisco.CARACTERISTICAS = discoEncontrado.CARACTERISTICAS
    }

    if(body.idColecao && body.idColecao != discoEncontrado.idColecao ){
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