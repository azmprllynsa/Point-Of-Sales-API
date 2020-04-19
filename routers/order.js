const express = require('express');

const router = express.Router();

const orderController = require('../controllers/OrderController');

router
  .get('/', orderController.getOrder)
  .get('/:orderId', orderController.detailOrder)
  .post('/', orderController.insertOrder)
  .patch('/:orderId', orderController.updateOrder)
  .delete('/:orderId', orderController.deleteOrder)
  .post('/send-email/:order_id', orderController.sendEmail);

module.exports = router;
