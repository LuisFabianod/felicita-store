const { DataTypes } = require('sequelize'); // declaração dos tipos do sequelize
const { sequelize } = require('../database/sequelize'); // declaração da conexão à db

const Section = sequelize.define('Section', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
});

module.exports = Section; // exporta o model