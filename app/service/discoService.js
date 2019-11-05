const mysql = require('mysql');
const connection = require('../config/env')



exports.criaDisco = function(disco, res){
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
    
    conexao.query(sql + values, function (err, result) {
        if (err) {
            return res.status(500).send({mensagem: "Erro ao salvar disco"})
        }else{
            return res.status(200).send({mensagem: "Disco cadastrato com sucesso"})
        }
    })
}

exports.encontraDiscoId = function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)
    new Promise((resolve, reject) => {
        conexao.query(
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
            if (error) {
                return res.status(500).send({mensagem: "Erro ao consultar disco"})
            }else if(!results.length){
                return res.status(400).send({mensagem: "Nenhum disco encontrado"})
            }else{
                return res.status(200).send(results)
            }
        });
    })
}

exports.encontraDisco = function(condicao, res){
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
            DESC_DISCO LIKE N? 

        ORDER BY 
            ID_DISCO DESC 
        LIMIT 
            ?, ?`,
        [condicao.texto, condicao.skip, condicao.limit],
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

exports.editaDisco = function(param, res){
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

    conexao.query(sql, function (err, result) {
        if (err) {
            return res.status(500).send({mensagem: "Erro ao salvar disco"})
        }else{
            return res.status(200).send({mensagem: "Disco editado com sucesso"})
        }
    })
}