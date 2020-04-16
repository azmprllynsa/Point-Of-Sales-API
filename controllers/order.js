/* eslint-disable no-const-assign */
const { order } = require('../models');
const helpers = require('../helpers/response');
const { customer } = require('../models');
const { user } = require('../models');

module.exports = {
  getOrder: (async (req, res) => {
    let response = {};
    try {
      const data = await order.findAll({
        include: [{
          model: customer,
          as: 'customerId',
          required: true,
          attributes: ['name', 'email'],
        }, {
          model: user,
          as: 'userId',
          required: true,
          attributes: ['name'],
        }],
      });
      if (data === null) {
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

  insertOrder: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await order.create(body);
      if (data === undefined) {
        response.status = 400;
        response.message = 'Input Invalid';

        helpers.generic(res, response);
      } else {
        response.status = 201;
        response.message = 'Product Has Been Added';
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

  detailOrder: (async (req, res) => {
    const response = {};
    try {
      const { orderId } = req.params;
      const data = await order.findOne({
        where: {
          id: orderId,
        },
      });
      if (data === null) {
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
  updateOrder: (async (req, res) => {
    let response = {};
    try {
      const { orderId } = req.params;
      const { body } = req;
      const [edit] = await order.update(body, {
        where: {
          id: orderId,
        },
      });
      const data = await order.findOne({
        where: {
          id: orderId,
        },
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'Book Successfully Edited';
        response.data = data;

        helpers.generic(res, response);
      } if (edit === 0) {
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

  deleteOrder: (async (req, res) => {
    let response = {};
    try {
      const { orderId } = req.params;
      const data = await order.destroy({
        where: {
          id: orderId,
        },
      });
      if (data) {
        response.status = 200;
        response.message = 'Successfully Deleted';

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
