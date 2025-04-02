const express = require('express'); 
const router = express.Router(); 
const favoriteController = require('../controllers/favorite');

router.get('/load/:userId', favoriteController.loadFavoriteProducts);

router.post('/add/:userId/:productId', favoriteController.addFavoriteProduct);

module.exports = router; 