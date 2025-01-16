const { DataTypes } = require('sequelize'); // declaração dos tipos do sequelize
const { sequelize } = require('../database/sequelize'); // declaração da conexão à db

const LayoutConfig = sequelize.define('layout_config', {
    imagens: {
        type: DataTypes.STRING,
        allowNull: false
    },
});

module.exports = LayoutConfig; // exporta o model