const moment = require('moment');

const disco_tb = ('disco_tb',
    {
        idDisco: {
            type: BigInt(20), 
            field:'ID_DISCO', 
            allowNull: false, 
            autoIncrement: true,
            primaryKey: true
        },

        nomeDisco: {
            type: String(100), 
            field:'NOME_DISCO', 
            allowNull: false
        },

        descDisco: {
            type: String(400), 
            field:'DESC_DISCO', 
            allowNull: false
        },

        dataLancamento: {
            type: String(10), 
            field:'DATA_LANCAMENTO',
            allowNull: false, 
            defaultValue: moment().format('YYYY-MM-DD')
        },

        caracteriscaDisco: {
            type: JSON, 
            field:'CARACTERISTICAS', 
            allowNull: false
        },
        
        idColecao: {
            type: BigInt(20), 
            field:'ID_COLECAO', 
            allowNull: false
        },

        ativo: {
            type: BigInt(1),
            field:'ATIVO', 
            allowNull: false,
            defaultValue: 1
        },
    }, 
    {
        freezeTableName: true, 
        timestamps:false
    }
);

exports.getDisco_tb = function() {
    return disco_tb
}
