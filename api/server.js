const express = require('express'); // declaração do express
const session = require('express-session');
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

  const sessionOptions = {
    secret: 'segredo', // Chave para criptografar a sessão
    resave: false, // Não salva sessões não modificadas
    saveUninitialized: true, // Força a criação de sessões, mesmo sem dados
    cookie: { secure: false, maxAge: 3600000 } // cookie com expiração de 1 hora
};
 
app.use(session(sessionOptions)); // habilita o uso de req.session que será útil na verificação de e-mail
app.use(cors(corsOptions)); // habilita o uso de cors com as configs declaradas
app.use(cookieParser()); // habilita o uso de cookie-parser

// declaração das rotas definidas na pasta routes
const accountRoutes = require('./routes/account'); 
const productRoutes = require('./routes/product')
const homeRoutes = require('./routes/home');

app.use(express.json()); // habilita a compreenssão das reqs como json pelo express
app.use(express.urlencoded({ extended: true })); // receber as informações de form via req.body

// atribuição das rotas com base no caminho inicial
app.use('/', homeRoutes)
app.use('/product', productRoutes);
app.use('/account', accountRoutes);

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