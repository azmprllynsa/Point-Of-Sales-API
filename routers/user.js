const express = require('express');

const router = express.Router();

const userController = require('../controllers/UserController');

router
  .post('/register', userController.registerUser)
  .post('/login', userController.loginUser)
  .get('/', userController.getUser)
  .get('/:user_id', userController.detailUser)
  .patch('/:user_id', userController.updateUser)
  .delete('/:user_id', userController.deleteUser);


module.exports = router;
