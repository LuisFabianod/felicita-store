const { DataTypes } = require('sequelize'); // declaração dos tipos do sequelize
const { sequelize } = require('../database/sequelize'); // declaração da conexão à db

const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoria: {
        type: DataTypes.JSON,
        allowNull: false,
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagens: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = Product; // exporta o model