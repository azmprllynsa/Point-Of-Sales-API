const express = require('express');

const router = express.Router();
const productController = require('../controllers/ProductController');
const { upload } = require('../helpers/upload');

router
  .post('/', upload.single('product_image'), productController.insertProduct)
  .get('/', productController.getProduct)
  .patch('/:productId', productController.updateProduct)
  .get('/:productId', productController.detailProduct)
  .delete('/:productId', productController.deleteProduct);

module.exports = router;
