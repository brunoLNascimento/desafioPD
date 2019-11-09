const mysql = require('mysql');
const connection = require('../config/env')



exports.criaDisco = async function(disco, res){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `INSERT INTO disco_tb 
                    (NOME_DISCO, DATA_LANCAMENTO, DESC_DISCO, ID_COLECAO, ATIVO)
               VALUES ` 
    
    var values = `(
        '${disco.NOME_DISCO}', 
        '${disco.DATA_LANCAMENTO}', 
        '${disco.DESC_DISCO}',
        '${disco.ID_COLECAO}', 
        '${disco.ATIVO}'
    )`
    
    await conexao.query(sql + values, 
        function(err, response){
            if(err){
                return res.status(500).send({mensagem: "Erro ao cadastrar disco"})
            }else{
                return res.status(200).send({ mensagem: "Disco cadastrado com sucesso!" })
            }
        }
    )
}

exports.encontraDiscoId = async function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)
    await conexao.query(
        `SELECT  
            D.ID_DISCO AS idDisco,
            D.NOME_DISCO AS nomeDisco,
            D.DESC_DISCO AS descricao,
            D.DATA_LANCAMENTO AS dataLancamento
        FROM
            desafioPD.disco_tb D
        WHERE 
            ID_DISCO = ${condicao}
        AND 
            ATIVO = 1`,        
    function(err, response){
        if(err){
            return res.status(500).send({mensagem: "Erro ao consultar disco"})
        }
        if(!response.length){
            return res.status(400).send({message: "Nenhum disco encontrado"})
        }else{
            return res.status(200).send({
                mensagem: "Disco encontrado",
                discos: response
            })
        }
    })
}

exports.encontraDisco = async function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)

    await conexao.query(
        `select  
            D.ID_DISCO AS idDisco,
            D.NOME_DISCO AS nomeDisco,
            D.DESC_DISCO AS descricao,
            D.DATA_LANCAMENTO AS dataLancamento,
            C.NOME_COLECAO AS colecao
        FROM 
            desafioPD.disco_tb D,
            desafioPD.colecao_tb C
        WHERE
            C.ID_COLECAO = D.ID_COLECAO
        AND
            D.ATIVO = 1   
        AND
            NOME_DISCO LIKE N? 

        ORDER BY 
            ID_DISCO DESC 
        LIMIT 
            ?, ?`,
        [condicao.texto, condicao.skip, condicao.limit],
    function(err, response){
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

exports.disco = function(idDisco, res){
    var conexao = mysql.createConnection(connection.mysql)

    return new Promise((resolve) => {
        conexao.query(
            `SELECT * FROM disco_tb where ID_DISCO = '${idDisco}' AND ATIVO = 1`,
            (err, response) =>{
            if(err){
                return res.status(500).send({mensagem: "Erro ao consultar disco!"})
            }
            if(!response.length){
                return res.status(400).send({message: "Nenhum disco encontrado!"})
            }else{
                resolve(response[0])
            }  
        })
    })
}

exports.editaDisco = function(param, res){
    var conexao = mysql.createConnection(connection.mysql)
    var sql =   `UPDATE 
                    disco_tb 
                SET 
                    NOME_DISCO = '${param.NOME_DISCO}', 
                    DESC_DISCO = '${param.DESC_DISCO}',
                    ID_COLECAO = '${param.ID_COLECAO}',
                    DATA_LANCAMENTO = '${param.DATA_LANCAMENTO}'
                WHERE
                    ID_DISCO = ${param.idDisco}`

    return new Promise (() => {
        conexao.query(sql, (err, response) => {
            if(err){
                return res.status(500).send({mensagem: "Erro ao editar disco!"})
            }
            if(!response){
                return res.status(400).send({message: "Não foi possível editar disco!"})
            }else{
                return res.status(200).send({message: "Disco atualizado com sucesso!"})
            }
        })
    }) 
}


exports.removeDisco = function(idDisco, res){
    var conexao = mysql.createConnection(connection.mysql)
    var sql = `UPDATE disco_tb 
                SET 
                    ATIVO = 0
                WHERE
                    ID_DISCO = ${idDisco}`

    return new Promise(() => {
        conexao.query(sql, (err, response) => {
            if(err){
                return res.status(500).send({mensagem: "Erro ao editar disco!"})
            }
            if(!response){
                return res.status(400).send({message: "Não foi possível editar disco!"})
            }else{
                return res.status(200).send({message: "Disco deletado com sucesso!"})
            }
        }) 
    })
     
}