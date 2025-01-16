const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const layoutConfigController = require('../controllers/layout-config');

router.put('/update', layoutConfigController.layoutUpdate)

module.exports = router; // exporta as rotas do arquivo