/* eslint-disable linebreak-style */
const express = require('express');
const user = require('./user');
const product = require('./product');
const customer = require('./customer');
const order = require('./order');
const orderDetail = require('./orderDetail');
const category = require('./category');

const router = express.Router();

router
  .use('/user', user)
  .use('/product', product)
  .use('/customer', customer)
  .use('/order', order)
  .use('/orderdetail', orderDetail)
  .use('/category', category);


module.exports = router;
