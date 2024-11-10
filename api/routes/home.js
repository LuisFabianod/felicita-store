const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home')
const isLoggedIn = require('../middlewares/isLoggedIn');

router.get('', isLoggedIn.authMiddleware , homeController.index)

module.exports = router;