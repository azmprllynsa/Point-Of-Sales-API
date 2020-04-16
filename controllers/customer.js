/* eslint-disable no-const-assign */
const { customer } = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  insertCustomer: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await customer.create(body);
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

  getCustomer: (async (req, res) => {
    const response = {};
    try {
      const data = await customer.findAll({});
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
      // response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),

  detailCustomer: (async (req, res) => {
    let response = {};
    try {
      const { customerId } = req.params;
      const data = await customer.findOne({
        where: {
          id: customerId,
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

  updateCustomer: (async (req, res) => {
    let response = {};
    try {
      const { customerId } = req.params;
      const { body } = req;

      const [edit] = await customer.update(body, {
        where: {
          id: customerId,
        },
      });
      const data = await customer.findOne({
        where: {
          id: customerId,
        },
      });
      if (edit === 1) {
        response.status = 200;
        response.message = 'Book Successfully Edited';
        response.data = data;

        helpers.generic(res, response);
      }
      if (edit === 0) {
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

  deleteCustomer: (async (req, res) => {
    let response = {};
    try {
      const { customerId } = req.params;
      const data = await customer.destroy({
        where: {
          id: customerId,
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
