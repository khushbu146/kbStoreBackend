const express = require('express');
const categoryController = require('../controller/category-controller');
const router = express.Router();

//To get all categories
router.get('/',categoryController.getCategory);

//To add new category
router.post('/',categoryController.createCategory);

//To delete category
router.delete('/:cid',categoryController.deleteCategory);

module.exports = router;