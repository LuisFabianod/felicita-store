const express = require('express'); 
const router = express.Router(); 
const layoutConfigController = require('../controllers/layout-config');

router.put('/update', layoutConfigController.layoutUpdate);

router.get('/read-layout', layoutConfigController.loadLayout);

router.get('/images/:imagesDirectory', layoutConfigController.loadImages);

module.exports = router; 