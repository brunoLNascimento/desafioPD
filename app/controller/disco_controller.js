const modelDisco = require('../model/disco_model')
var mysql = require('mysql');

var connection = require('../config/env')

exports.salvaDisco = function(req, res){
    console.log("teste")
}

exports.buscaDisco = async function(req, res){
    condicao = req.params.id
    var conexao = mysql.createConnection(connection.mysql)
    conexao.query(
        `select  
        D.ID_DISCO AS idDisco,
        D.NOME_DISCO AS nomeDisco,
        D.DESC_DISCO AS descricao,
        D.DATA_LANCAMENTO AS dataLancamento,
        D.CARACTERISTICAS AS caractristicas
        from desafioPD.disco_tb D
        where ID_DISCO = ${condicao}`,        
    function (error, results) {
            if (error) {
                console.error(error)
                return res.status(500).send({mensagem: "Erro ao consultar disco"})
            }else if(!results.length){
                return res.status(400).send({mensagem: "Nenhum disco encontrado"})
            }else{
                return res.status(200).send(results)
            }
        });

    // if(!req.params.id){
    //     return res.status(400).send({ mensagem: 'Id do disco é obrigatório para consulta!'})
    // }
    
    // let retornoBusca = await serviceDisco.encontraDisco(req.params.id)
    
    // if(retornoBusca.message){
    //     return res.status(500).send({ mensagem: 'Erro ao consultar'})
    // }else if(retornoBusca.length){
    //     return res.status(400).send({ mensagem: 'Nenhum disco encontrado para a consulta!'})
    // }else{
    //     return res.status(200).send(retornoBusca)
    // }
    
}