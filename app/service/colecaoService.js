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
    
    conexao.query(sql + values
    ).then((result) => {
        callback(null, result)
    }).catch((err) => {
        callback(err, null)
    })
}

exports.encontraColecaoId = function(condicao, callback){
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
    ).then((result) => {
        callback(null, result)
    }).catch((err) => {
        callback(err, null)
    })
}

exports.encontraColecao = function(condicao, callback){
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
    ).then((result) => {
        callback(null, result)
    }).catch((err) => {
        callback(err, null)
    })
}

exports.colecao = async function(body, callback){
    var conexao = mysql.createConnection(connection.mysql)

    await conexao.query(
        `SELECT * FROM colecao_tb where NOME_COLECAO = '${body.nomeColecao}' AND ATIVO = 1`,
    ).then((result) => {
        callback(null, result)
    }).catch((err) => {
        callback(err, null)
    })
    
}


exports.removeColecao = async function(idDisco, callback){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `UPDATE colecao_tb 
                SET 
                    ATIVO = 0
                WHERE
                    ID_DISCO = ${idDisco}`

    await conexao.query(sql, 
    ).then((result) => {
        callback(null, result)
    }).catch((err) => {
        callback(err, null)
    })
}

