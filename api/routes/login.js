const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const loginController = require('../controllers/login'); // declaração do controller da home

// cria uma rota de post que utiliza o método userLogin do loginController
router.post('/login-usuario', loginController.userLogin)

module.exports = router; // exporta as rotas do arquivo