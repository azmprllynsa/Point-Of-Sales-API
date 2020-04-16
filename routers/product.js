const express = require('express');

const router = express.Router();

const productController = require('../controllers/product');

router
  .post('/', productController.insertProduct)
  .get('/', productController.getProduct)
  .patch('/:productId', productController.updateProduct)
  .get('/:productId', productController.detailProduct)
  .delete('/:productId', productController.deleteProduct);

module.exports = router;
