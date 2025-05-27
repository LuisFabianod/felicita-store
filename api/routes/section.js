const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const sectionController = require('../controllers/section'); // declaração do controller do cadastro

router.get('/load-sections', sectionController.loadSections);

module.exports = router; // exporta as rotas do arquivo