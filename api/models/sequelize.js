require('dotenv').config();
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.DATABASE, 
    process.env.USER_NAME, 
    process.env.PASSWORD, 
    { 
        host: process.env.HOST_NAME, 
        dialect: 'mysql' 
    }
);

async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Conexão com o MySQL estabelecida.');
    } catch (err) {
        console.error('Erro ao conectar ao MySQL:', err);
    }
}

module.exports = { sequelize, connectDatabase };