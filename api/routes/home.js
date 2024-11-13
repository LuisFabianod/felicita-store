const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (direciona arquivos com base no caminho rota da url)
const homeController = require('../controllers/home'); // declaração do controller da home
const isLoggedIn = require('../middlewares/isLoggedIn'); // middleware que verifica se o usuário está logado

// cria uma rota de get que utiliza o método authMiddleware do isLoggedIn e o método index do homeController
router.get('/verificar-login', isLoggedIn.authMiddleware , homeController.index) 

module.exports = router; // exporta as rotas do arquivo