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