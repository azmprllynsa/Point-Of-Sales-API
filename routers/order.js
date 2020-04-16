const express = require('express');

const router = express.Router();

const orderController = require('../controllers/order');

router
  .get('/', orderController.getOrder)
  .get('/:orderId', orderController.detailOrder)
  .post('/', orderController.insertOrder)
  .patch('/:orderId', orderController.updateOrder)
  .delete('/:orderId', orderController.deleteOrder);

module.exports = router;
