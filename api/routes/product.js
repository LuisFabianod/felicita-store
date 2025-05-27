const express = require('express'); // declaração do express
const router = express.Router(); // declaração do router (redireciona o código com base no caminho rota da url)
const productController = require('../controllers/product'); // declaração do controller do cadastro

router.post('/register-product', productController.productRegister);

router.get('/load-products', productController.loadProducts);

router.post('/search-products', productController.searchProducts);

router.get('/images/:imagesDirectory', productController.loadImages);

router.delete('/exclude-product', productController.excludeProduct);

module.exports = router; // exporta as rotas do arquivo