require('dotenv').config(); // habilita o uso das variáveis de ambiente do .env
const { Sequelize } = require('sequelize'); // declaração do sequelize

// definição da conexão com a db, usando as variáveis do .env
const sequelize = new Sequelize(    
    process.env.DATABASE, // nome da db
    process.env.USER_NAME, // usuário que tem acesso à db
    process.env.PASSWORD, // senha do usuário
    { 
        port: process.env.PORT,
        host: process.env.HOST_NAME, // host da db
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