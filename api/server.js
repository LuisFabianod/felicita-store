const express = require('express');
const app = express();
const port = 5000;

const cadastroRoutes = require('./routes/cadastro');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/cadastro', cadastroRoutes);

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${'http://localhost:' + port}`);
});