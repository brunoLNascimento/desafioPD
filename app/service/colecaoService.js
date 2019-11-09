const mysql = require('mysql');
const connection = require('../config/env')
const moment = require('moment')


exports.criaColecao = function(colecao, res){
    let conexao = mysql.createConnection(connection.mysql)
    var sql = `INSERT INTO colecao_tb 
                    (NOME_COLECAO, DATA_CRIACAO, ATIVO)
               VALUES ` 
    var values = `(
        '${colecao.nomeColecao}', 
        '${colecao.dataCriacao}', 
        '${colecao.ativo}'
    )`
    return new Promise (() => {
        conexao.query(sql + values, (err, result) => {
            if(err){
                return res.status(500).send({mensagem: "Erro ao consultar disco!"})
                            
            }else{
                return res.status(200).send({ mensagem: "Coleção criada com sucesso!" })
            }
        })
    })
}

exports.encontraColecaoId = function(condicao, res){
    let conexao = mysql.createConnection(connection.mysql)

    return new Promise (() => {
        conexao.query(
            `SELECT  
                C.ID_COLECAO AS idColecao,
                C.NOME_COLECAO AS nomeColecao,
                C.DATA_CRIACAO AS dataCriacao
            FROM
                desafioPD.colecao_tb C
            WHERE 
                ID_COLECAO  = ${condicao.id}
            AND 
             ATIVO = 1`, (err, result) => {
                  
                if (err) {
                    return res.status(500).send({mensagem: "Erro ao consultar coleção"})
                }else if(!result.length){
                    return res.status(400).send({mensagem: "Nenhuma coleção encontrado"})
                }else{
                    return res.status(200).send(result)
                }
            }
        )
    })
}

exports.encontraColecao = function(condicao, res){
    let conexao = mysql.createConnection(connection.mysql)

    return new Promise (() => {
        conexao.query(
            `SELECT  
                C.NOME_COLECAO AS colecao,
                C.DATA_CRIACAO AS dataCriacao,
                C.ID_COLECAO AS idColecao
            FROM 
                desafioPD.colecao_tb C
            WHERE
                NOME_COLECAO  LIKE N? 
            AND
                C.ATIVO = 1   
            ORDER BY 
                ID_COLECAO DESC 
            LIMIT 
                ?, ?`,
            [condicao.colecao, condicao.skip, condicao.limit], (err, result) => {
                if (err) {
                    console.error(err)
                    return res.status(500).send({mensagem: "Erro ao consultar coleção"})
                }else if(!result.length){
                    return res.status(400).send({mensagem: "Nenhuma coleção encontrado"})
                }else{
                    return res.status(200).send({
                        mensagem: "Coleção encontrada para a busca: " +result.length,
                        coleções: result
                    })
                }
        })
    })
}

exports.editaColecao = function(body, res){
    var conexao = mysql.createConnection(connection.mysql)

    return new Promise (() => {
        var sql = `UPDATE colecao_tb 
                    SET 
                        NOME_COLECAO = '${body.NOME_COLECAO}', 
                        ID_COLECAO = '${body.idColecao}',
                        DATA_CRIACAO = '${body.DATA_CRIACAO}'
                    WHERE
                        ID_COLECAO = ${body.idColecao}`

        conexao.query(sql, (err, response) => {
            if(err){
                return res.status(500).send({mensagem: "Erro ao editar Coleção!"})
            }
            if(!response){
                return res.status(400).send({message: "Não foi possível editar Coleção!"})
            }else{
                return res.status(200).send({message: "Coleção editada com sucesso!"})
            }
        })
    })
}


exports.colecao = function(body, res){
    let conexao = mysql.createConnection(connection.mysql)

    if(body.idColecao){
        var colecao = `ID_COLECAO = '${body.idColecao}'`
    }else{
        var colecao = `NOME_COLECAO = '${body.nomeColecao}'`
    }

     return new Promise ((resolve) => {
        conexao.query(
               `SELECT * FROM colecao_tb WHERE ${colecao} AND ATIVO = 1`,
           (err, result) => {
                if (err) {
                    return res.status(500).send({mensagem: "Erro ao salvar coleção"})
                }if (result.length && !body.idColecao){
                    return res.status(200).send({mensagem: "Coleção já exites com esse nome"})
                }else{
                    resolve(result)
                }
           }
        )
    })    
}


exports.removeColecao = function(params, res){
    let conexao = mysql.createConnection(connection.mysql)
    var diaExclusao = moment().format('DD/MM/YYYY')
    
    var sql = `UPDATE 
                    colecao_tb 
                SET 
                    ATIVO = 0,
                    DATA_EXCLUSAO = ${diaExclusao}
                WHERE
                    ID_COLECAO = ${params.idColecao}`

    return new Promise (() => {
        conexao.query(sql, (err) => {
            if (err) {
                return res.status(500).send({mensagem: "Erro ao excluir coleção"})
            }else{
                return res.status(200).send({mensagem: "Coleção excluida com sucesso!"})
            }
        })
    })
}

