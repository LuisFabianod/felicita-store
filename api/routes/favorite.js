const express = require('express'); 
const router = express.Router(); 
const favoriteController = require('../controllers/favorite');

router.post('/load', favoriteController.loadFavoriteProducts);

router.post('/add', favoriteController.addFavoriteProduct);

module.exports = router; 