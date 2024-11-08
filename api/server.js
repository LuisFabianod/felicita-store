const express = require('express');
const app = express();
const port = 5000;

const { sequelize, connectDatabase } = require('./models/sequelize');
connectDatabase();

const controllerRoutes = require('./routes/cadastro');
const loginRoutes = require('./routes/login')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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