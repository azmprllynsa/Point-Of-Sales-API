const express = require('express');

const router = express.Router();

const categoryController = require('../controllers/CategoryController');

router
  .post('/', categoryController.insertCategory);

module.exports = router;
