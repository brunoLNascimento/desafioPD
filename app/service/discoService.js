const mysql = require('mysql');
const connection = require('../config/env')



exports.criaDisco = async function(disco, callback){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `INSERT INTO disco_tb 
                    (NOME_DISCO, DESC_DISCO, DATA_LANCAMENTO, CARACTERISTICAS, ID_COLECAO, ATIVO)
               VALUES ` 
    
    var values = `(
        '${disco.NOME_DISCO}', 
        '${disco.DESC_DISCO}',
        '${disco.DATA_LANCAMENTO}', 
        '${disco.CARACTERISTICAS}',
        '${disco.ID_COLECAO}', 
        '${disco.ATIVO}'
    )`
    
    await conexao.query(sql + values, function (err, result) {
        if (err) {
            callback(error, null)
        }else{
            callback(results, null)
        }
    })
}

exports.encontraDiscoId = async function(condicao, callback){
    var conexao = mysql.createConnection(connection.mysql)
    await conexao.query(
        `SELECT  
            D.ID_DISCO AS idDisco,
            D.NOME_DISCO AS nomeDisco,
            D.DESC_DISCO AS descricao,
            D.DATA_LANCAMENTO AS dataLancamento,
            D.CARACTERISTICAS AS caractristicas
        FROM
            desafioPD.disco_tb D
        WHERE 
            ID_DISCO = ${condicao}
        AND 
            ATIVO = 1`,        
    function (error, results) {
        if (err) {
            callback(error, null)
        }else{
            callback(results, null)
        }
    });
}

exports.encontraDisco = async function(condicao, callback){
    var conexao = mysql.createConnection(connection.mysql)

    await conexao.query(
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
            DESC_DISCO LIKE N? 

        ORDER BY 
            ID_DISCO DESC 
        LIMIT 
            ?, ?`,
        [condicao.texto, condicao.skip, condicao.limit],
        (error, results) => {
            if (err) {
                callback(error, null)
            }else{
                callback(results, null)
            }
        }
    )
}

exports.disco = async function(idDisco, res){
    var conexao = mysql.createConnection(connection.mysql)

    return new Promise(async (resolve, reject) => {
        conexao.query(
            `SELECT * FROM disco_tb where ID_DISCO = '${idDisco}' AND ATIVO = 1`,
            async (error, results) => {
                if (error) {
                    reject(results)
                }else{
                    resolve(results)
                }
            }
        )
    })
}

exports.editaDisco = async function(param, callback){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `UPDATE disco_tb 
                SET 
                    NOME_DISCO = '${param.NOME_DISCO}', 
                    DESC_DISCO = '${param.DESC_DISCO}',
                    ID_COLECAO = '${param.ID_COLECAO}',
                    CARACTERISTICAS = '${param.CARACTERISTICAS}',
                    DATA_LANCAMENTO = '${param.disco.DATA_LANCAMENTO}'
                WHERE
                    ID_DISCO = ${param.disco.ID_DISCO}`

    await conexao.query(sql, async (error, result) => {
        if (err) {
            callback(error, null)
        }else{
            callback(result, null)
        }
    })
}


exports.removeDisco = async function(idDisco, callback){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `UPDATE disco_tb 
                SET 
                    ATIVO = 0
                WHERE
                    ID_DISCO = ${idDisco}`

    await conexao.query(sql, async (error, result) => {
        if (err) {
            callback(error, null)
        }else{
            callback(result, null)
        }
    })
}