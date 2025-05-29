const express = require('express'); 
const session = require('express-session');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const path = require('path');

const app = express(); 
const port = 5000; 

const { sequelize, connectDatabase } = require('./database/sequelize'); // declaração da conexão e da função que conecta à db

connectDatabase(); // conectar à db

const corsOptions = {
    origin: ['http://localhost:3000', 'https://felicitapijamaria-95zuvipes.vercel.app'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept', 'User-Agent'], 
    exposedHeaders: ['Content-Length', 'Content-Type'],
    credentials: true 
  };

  const sessionOptions = {
    secret: 'segredo', // Chave para criptografar a sessão
    resave: false, // Não salva sessões não modificadas
    saveUninitialized: false, // Não salva sessões até que algo seja atribuído
    cookie: { secure: true, maxAge: 3600000 } // cookie com expiração de 1 hora
};


app.use('/images', express.static(path.join(__dirname, 'images'), {
    setHeaders: (res, path) => {
        const allowedOrigins = ['http://localhost:3000', 'https://felicitapijamaria-95zuvipes.vercel.app'];
        const origin = res.req.headers.origin;
        if (allowedOrigins.includes(origin)) {
            res.setHeader('Access-Control-Allow-Origin', origin);
            res.setHeader('Access-Control-Allow-Credentials', 'true');
        }
    }
}));
 
app.use(session(sessionOptions)); // habilita o uso de req.session que será útil na verificação de e-mail
app.use(cors(corsOptions)); // habilita o uso de cors com as configs declaradas
app.use(cookieParser()); // habilita o uso de cookie-parser

// declaração das rotas definidas na pasta routes
const accountRoutes = require('./routes/account'); 
const productRoutes = require('./routes/product')
const homeRoutes = require('./routes/home');
const layoutConfigRoutes = require('./routes/layout-config');
const favoriteRoutes = require('./routes/favorite');
const sectionRoutes = require('./routes/section');

app.use(express.json()); // habilita a compreenssão das reqs como json pelo express
app.use(express.urlencoded({ extended: true })); // receber as informações de form via req.body

// atribuição das rotas com base no caminho inicial
app.use('/', homeRoutes)
app.use('/product', productRoutes);
app.use('/account', accountRoutes);
app.use('/layout-config', layoutConfigRoutes);
app.use('/favorite', favoriteRoutes);
app.use('/section', sectionRoutes );

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