const express = require('express');

const router = express.Router();

const customerController = require('../controllers/customer');

router
  .post('/', customerController.insertCustomer)
  .get('/', customerController.getCustomer)
  .get('/:customerId', customerController.detailCustomer)
  .patch('/:customerId', customerController.updateCustomer)
  .delete('/:customerId', customerController.deleteCustomer);

module.exports = router;
