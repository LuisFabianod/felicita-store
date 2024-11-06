const express = require('express');
const app = express();
const port = 5000;

const controllerRoutes = require('./routes/cadastro');
const loginRoutes = require('./routes/login')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cadastro', controllerRoutes);
app.use('/login', loginRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${'http://localhost:' + port}`);
});