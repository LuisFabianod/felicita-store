const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const port = 5000;

const { sequelize, connectDatabase } = require('./database/sequelize');
connectDatabase();

const corsOptions = {
    origin: 'http://localhost:3000', // Substitua pela URL do seu frontend
    credentials: true,  // Permite o envio de cookies
  };

app.use(cors(corsOptions));
app.use(cookieParser());

const controllerRoutes = require('./routes/cadastro');
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes)
app.use('/cadastro', controllerRoutes);
app.use('/login', loginRoutes);

sequelize.sync()
.then(() => {
    console.log('Tabelas sincronizadas com sucesso.');
    app.listen(port, () => {
        console.log(`Servidor rodando na porta ${'http://localhost:' + port}`);
    });
})
.catch(err => console.error('Erro ao sincronizar tabelas:', err));