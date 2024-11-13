const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const cadastroController = require('../controllers/cadastro'); // declaração do controller do cadastro

// cria uma rota de post que utiliza o método userRegister do cadastroController
router.post('/cadastrar-usuario', cadastroController.userRegister)

module.exports = router; // exporta as rotas do arquivo