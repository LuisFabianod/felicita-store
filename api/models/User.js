const { DataTypes } = require('sequelize'); // declaração dos tipos do sequelize
const { sequelize } = require('../database/sequelize'); // declaração da conexão à db

// declaração do modal User, instância da tabela users
// nome: string, não pode ser nulo
// email: string, não pode ser nulo, é único para cada registro
// senha: string, não pode ser nulo
// id: integer, não pode ser nulo, incrementa a cada registro, é a pk
const User = sequelize.define('User', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
});

module.exports = User; // exporta o model