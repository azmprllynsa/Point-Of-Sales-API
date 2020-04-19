/* eslint-disable no-shadow */
/* eslint-disable no-const-assign */
const bcrypt = require('bcryptjs');
const { User } = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  registerUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);
      const data = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        image: 'photo.jpg',
        role_id: 0,
        status: 0,
      });
      if (data === null) {
        response.status = 400;
        response.message = 'Something Error!';
        helpers.generic(res, response);
      } else {
        response.status = 201;
        response.message = 'Account has been created!';
        response.data = data;
        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  loginUser: (async (req, res) => {
    let response = {};
    try {
      const { email } = req.body;
      const data = await User.findOne({
        where: {
          email,
        },
      });
      if (!data) {
        response.status = 404;
        response.message = 'Email Not Found! Please Register First!';

        helpers.generic(res, response);
      }
      if (data) {
        const authorized = bcrypt.compareSync(req.body.password, data.password);
        if (!authorized) {
          response.status = 404;
          response.message = 'Password Incorrect!';

          helpers.generic(res, response);
          // }
          // if (data.status !== 1) {
          //   response.status = 400;
          //   response.message = 'Your Account Need Email Confirmation!';

          //   helpers.generic(res, response);
        } else {
          // const token = jwt.sign({ id: data.id, email }, process.env.SECRET_KEY);
          // data.dataValues.token = token;
          response.status = 200;
          response.message = `${email} Login Successfully!`;
          response.data = data;

          helpers.generic(res, response);
        }
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  getUser: (async (req, res) => {
    const response = {};
    try {
      const data = await User.findAll({});

      if (data.length === 0) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      } else {
        response.status = 200;
        response.message = 'OK';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  detailUser: (async (req, res) => {
    let response = {};
    try {
      const userId = req.params.user_id;

      const data = await User.findOne({
        where: {
          id: userId,
        },
      });

      if (!data) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      } else {
        response.status = 200;
        response.message = 'OK';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  updateUser: (async (req, res) => {
    let response = {};
    try {
      const salt = bcrypt.genSaltSync(10);
      const userId = req.params.user_id;
      const password = bcrypt.hashSync(req.body.password, salt);
      let { body } = req;
      body = Object.assign(body, { password });
      const data = await User.findOne({
        where: {
          id: userId,
        },
      });

      const [edit] = await User.update(body,
        {
          where: {
            id: userId,
          },
        });

      if (edit === 0) {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
      if (edit === 1) {
        response.status = 200;
        response.message = 'User Data Successfully Edited';
        response.data = data;

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),
  deleteUser: (async (req, res) => {
    let response = {};
    try {
      const userId = req.params.user_id;

      const data = await User.destroy({
        where: {
          id: userId,
        },
      });

      if (data) {
        response.status = 200;
        response.message = 'User Successfully Deleted';

        helpers.generic(res, response);
      } else {
        response.status = 404;
        response.message = 'Data Not Found';

        helpers.generic(res, response);
      }
    } catch (err) {
      response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),
};
