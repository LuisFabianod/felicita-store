const express = require('express');
const router = express.Router();
const loginController = require('../controllers/login');

router.post('/login-usuario', loginController.userLogin)

module.exports = router;