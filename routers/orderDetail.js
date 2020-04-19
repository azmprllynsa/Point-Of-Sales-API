const express = require('express');

const router = express.Router();

const orderDetailController = require('../controllers/OrderDetailController');

router
  .post('/', orderDetailController.insertOrderDetail)
  .get('/', orderDetailController.getOrderDetail)
  .get('/:orderDetailId', orderDetailController.orderDetailById)
  .patch('/:orderDetailId', orderDetailController.updateOrderDetail)
  .delete('/:orderDetailId', orderDetailController.deleteOrderDetail);

module.exports = router;
