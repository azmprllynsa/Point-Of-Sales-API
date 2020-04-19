/* eslint-disable no-const-assign */
const { OrderDetail } = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  insertOrderDetail: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await OrderDetail.create(body);
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

  getOrderDetail: (async (req, res) => {
    const response = {};
    try {
      const data = await OrderDetail.findAll({});
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

  orderDetailById: (async (req, res) => {
    const response = {};
    try {
      const { orderDetailId } = req.params;
      const data = await OrderDetail.findOne({
        where: {
          id: orderDetailId,
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

  updateOrderDetail: (async (req, res) => {
    const response = {};
    try {
      const { orderDetailId } = req.params;
      const { body } = req;
      const [edit] = await OrderDetail.update(body, {
        where: {
          id: orderDetailId,
        },
      });
      const data = await OrderDetail.findOne({
        where: {
          id: orderDetailId,
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

  deleteOrderDetail: (async (req, res) => {
    const response = {};
    try {
      const { orderDetailId } = req.params;
      const data = await OrderDetail.destroy({
        where: {
          id: orderDetailId,
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
