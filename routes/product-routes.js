const express = require('express');
const { check } = require('express-validator');
const productController = require('../controller/product-controller');
const router = express.Router();

//To get all products
router.get('/', productController.getProducts);

//To  add new product
router.post('/',
    [
        check('name')
            .not()
            .isEmpty(),
        check('price')
            .not()
            .isEmpty(),
        check('brand')
            .not()
            .isEmpty(),
        check('description').isLength({min:12}),

    ],
    productController.createProduct);

//To update product
router.patch('/:pid', productController.updateProduct);

//To delete product
router.delete('/:pid',productController.deleteProduct);

module.exports = router;