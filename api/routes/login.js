const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const loginController = require('../controllers/login'); // declaração do controller do login

// cria uma rota de post que controla o login do usuário
router.post('/login-user', loginController.userLogin)

// cria uma rota de post que controla o logout do usuário
router.post('/logout', loginController.userLogout)

module.exports = router; // exporta as rotas do arquivo