const modelDisco = require('../model/disco_model')
const serviceDisco = require('../service/buscaDisco_service')
const mysql = require('mysql');
const connection = require('../config/env')

exports.salvaDisco = function(req, res){
    console.log("teste")
}

exports.buscaDisco = async function(req, res){
    condicao = req.params.id
    serviceDisco.encontraDiscoId(condicao, res)
}

exports.encontraDisco = async function(req, res){
    var page = req.params.page
    var limit = 50

    // if(req.query.action == "lancamento"){
    //     buscaDiscoDtLancamento(req.params)
    // }else if(req.query.action == "disco"){
    //     buscaDisco(req.params)
    // }else if(req.query.colecao == "colecao"){
    //     buscaDiscoColecao(req.params)
    // }else{
    //     buscaDescDisco(req.params)
    // }

    if(!req.params.texto){
        var texto = ""
    }else{
        var texto = req.params.texto
    }

    var condicao = { 
        page: page,
        limit: limit,
        skip: page * limit,
        texto: '%' +texto+ '%'
    }
    
    serviceDisco.encontraDisco(condicao, res)
}