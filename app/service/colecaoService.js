const mysql = require('mysql');
const connection = require('../config/env')
const moment = require('moment')

exports.criaColecao = function(colecao, res){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `INSERT INTO colecao_tb 
                    (NOME_COLECAO, DESC_COLECAO, DATA_CRIACAO, ATIVO)
               VALUES ` 
    var values = `(
        '${colecao.nomeColecao}', 
        '${colecao.descrColecao}',
        '${moment().format("YYYY-MM-DD")}', 
        '1'
    )`
    
    conexao.query(sql + values, function (err, result) {
        if (err) {
            return res.status(500).send({mensagem: "Erro ao salvar disco"})
        }else{
            return res.status(200).send({mensagem: "Disco cadastrato com sucesso"})
        }
    })
}

exports.encontraColecaoId = function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)
    conexao.query(
        `SELECT  
            C.ID_COLECAO AS idColecao,
            C.NOME_COLECAO AS nomeColecao,
            C.DESC_COLECAO AS descricao
        FROM
            desafioPD.colecao_tb C
        WHERE 
            ID_COLECAO = ${condicao.id}
        AND 
            ATIVO = 1`,        
    function (error, results) {
            if (error) {
                console.error(error)
                return res.status(500).send({mensagem: "Erro ao consultar coleção"})
            }else if(!results.length){
                return res.status(400).send({mensagem: "Nenhuma coleção encontrado"})
            }else{
                return res.status(200).send(results)
            }
        });
}

exports.encontraColecao = function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)

    conexao.query(
        `select  
            D.ID_DISCO AS idDisco,
            D.NOME_DISCO AS nomeDisco,
            D.DESC_DISCO AS descricao,
            D.DATA_LANCAMENTO AS dataLancamento,
            D.CARACTERISTICAS AS caractristicas,
            C.NOME_COLECAO AS colecao,
            C.DESC_COLECAO AS descrColecao
        FROM 
            desafioPD.disco_tb D,
            desafioPD.colecao_tb C
        WHERE
            C.ID_COLECAO = D.ID_COLECAO
        AND
            D.ATIVO = 1   
        AND
            NOME_COLECAO  LIKE N? 

        ORDER BY 
            ID_DISCO DESC 
        LIMIT 
            ?, ?`,
        [condicao.colecao, condicao.skip, condicao.limit],
        (error, results) => {
            if (error) {
                return res.status(500).send({mensagem: "Erro ao consultar disco"})
            }else if(!results.length){
                return res.status(400).send({mensagem: "Nenhum disco encontrado"})
            }else{
                return res.status(200).send({
                    mensagem: "Discos encontrados para a busca: " +results.length,
                    res: results
                })
            }
        }
    )
}

exports.colecao = async function(body, callback){
    var conexao = mysql.createConnection(connection.mysql)

    await conexao.query(
        `SELECT * FROM colecao_tb where NOME_COLECAO = '${body.nomeColecao}' AND ATIVO = 1`,
        async (error, result) => {
            if (error) {
                callback(error, null)
            }else{
                callback(result, null)
            }
        }
    )
}