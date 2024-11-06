const express = require('express');
const router = express.Router();
const cadastroController = require('../controllers/cadastro');

router.post('/cadastrar-usuario', cadastroController.cadastrarUsuario)

module.exports = router;