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
        unique: true
    },
    categoria: {
        type: DataTypes.INTEGER,
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
    foto1: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto2: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

module.exports = Product; // exporta o model