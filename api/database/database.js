require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.HOST_NAME,     
    user: process.env.USER_NAME,   
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
});

connection.connect((erro) => {
    if (erro) {
        console.error('Erro ao conectar ao MySQL:', erro);
    } else {
        console.log('Conectado ao MySQL!');
    }
});

module.exports = connection;