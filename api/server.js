const express = require('express'); // declaração do express
const cors = require('cors'); // inicialização da biblioteca cors
const cookieParser = require('cookie-parser'); // declaração da biblioteca cookie-parser 

const app = express(); // inicialização do express
const port = 5000; // porta que o servidor vai escutar

const { sequelize, connectDatabase } = require('./database/sequelize'); // declaração da conexão e da função que conecta à db

connectDatabase(); // conectar à db

// libera à chegada de requisições http vindas do front-end
const corsOptions = {
    origin: 'http://localhost:3000', 
    credentials: true, // possibilta os cookies ?
  };

app.use(cors(corsOptions)); // habilita o uso de cors com as configs declaradas
app.use(cookieParser()); // habilita o uso de cookie-parser

// declaração das rotas definidas na pasta routes
const controllerRoutes = require('./routes/cadastro'); 
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');

app.use(express.json()); // habilita a compreenssão das reqs como json pelo express
app.use(express.urlencoded({ extended: true })); // receber as informações de form via req.body

// atribuição das rotas com base no caminho inicial
app.use('/', homeRoutes)
app.use('/cadastro', controllerRoutes);
app.use('/login', loginRoutes);

// sincronizar tabelas da db com os modelos do sequelize
sequelize.sync()
.then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
    // iniciar servidor na porta declarada
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${'http://localhost:' + port}`);
    });
})
.catch(err => console.error('Erro ao sincronizar tabelas:', err));