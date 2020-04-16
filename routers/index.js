/* eslint-disable linebreak-style */
const express = require('express');
const user = require('./user');
const product = require('./product');
const customer = require('./customer');
const order = require('./order');

const router = express.Router();

router
  .use('/user', user)
  .use('/product', product)
  .use('/customer', customer)
  .use('/order', order);


module.exports = router;
