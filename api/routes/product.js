const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const productController = require('../controllers/product'); // declaração do controller do cadastro

router.post('/register-product', productController.productRegister);

router.get('/read-products', productController.loadProducts);

router.get('/images/:imagesDirectory', productController.loadImages);

module.exports = router; // exporta as rotas do arquivo