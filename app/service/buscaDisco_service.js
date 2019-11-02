const mysql = require('mysql');
const connection = require('../config/env')

exports.encontraDiscoId = function(condicao, res){
    var conexao = mysql.createConnection(connection.mysql)
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
                console.error(error)
                return res.status(500).send({mensagem: "Erro ao consultar disco"})
            }else if(!results.length){
                return res.status(400).send({mensagem: "Nenhum disco encontrado"})
            }else{
                return res.status(200).send(results)
            }
        });
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