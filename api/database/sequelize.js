require('dotenv').config(); // habilita o uso das variáveis de ambiente do .env
const { Sequelize } = require('sequelize'); // declaração do sequelize

// definição da conexão com a db, usando as variáveis do .env
// ----- BLOCO DE DEBUG FUNDAMENTAL -----
console.log('--- VARIÁVEIS DE CONEXÃO LIDAS PELA APLICAÇÃO ---');
console.log('Host que a app está usando:', process.env.HOST_NAME); // Ou process.env.MYSQLHOST se você mudou
console.log('Porta que a app está usando:', process.env.PORT);      // Ou process.env.MYSQLPORT
console.log('Database que a app está usando:', process.env.DATABASE);  // Ou process.env.MYSQLDATABASE
console.log('User que a app está usando:', process.env.USER_NAME);  // Ou process.env.MYSQLUSER
console.log('Password que a app está usando:', process.env.PASSWORD);  // Ou process.env.MYSQLPASSWORD
// ----- FIM DO BLOCO DE DEBUG -----
const sequelize = new Sequelize(    
    process.env.DATABASE, // nome da db
    process.env.USER_NAME, // usuário que tem acesso à db
    process.env.PASSWORD, // senha do usuário
    { 
        port: process.env.PORT,
        host: process.env.HOST_NAME || '127.0.0.1', // host da db
        dialect: 'mysql' // define a sintax dos comandos para mysql
    }
);

// função para conectar à db
async function connectDatabase() {
    try {
        await sequelize.authenticate(); // testa a conexão com a db tentando entrar nela com usuário e senha
        console.log('Conexão com o MySQL estabelecida.');
    } catch (err) {
        // caso a autenticação falhe, é informado o erro
        console.error('Erro ao conectar ao MySQL:', err);
    }
}

module.exports = { sequelize, connectDatabase }; // exporta a conexão e função para conectar