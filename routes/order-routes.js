const express = require('express');

const ordersController = require('../controller/');
const router = express.Router();

router.get('/', orderController.getOrder);



module.export = router;
