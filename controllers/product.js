/* eslint-disable no-const-assign */
const { product } = require('../models');
const helpers = require('../helpers/response');
const { category } = require('../models');

module.exports = {
  insertProduct: (async (req, res) => {
    let response = {};
    try {
      const { body } = req;
      const data = await product.create(body);
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
  getProduct: (async (req, res) => {
    const response = {};
    try {
      const data = await product.findAll({
        include: {
          model: category,
          as: 'productCategory',
          required: true,
          attributes: ['name'],
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
  detailProduct: (async (req, res) => {
    let response = {};
    try {
      const { productId } = req.params;
      const data = await product.findOne({
        exclude: ['createdAt', 'updatedAt'],
        include: {
          model: category,
          as: 'productCategory',
          required: true,
          attributes: ['name'],
        },
        where: {
          id: productId,
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


  updateProduct: (async (req, res) => {
    let response = {};
    try {
      const { productId } = req.params;
      const { body } = req;

      const [edit] = await product.update(body, {
        where: {
          id: productId,
        },
      });
      const data = await product.findOne({
        where: {
          id: productId,
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

  deleteProduct: (async (req, res) => {
    let response = {};
    try {
      const { productId } = req.params;
      const data = await product.destroy({
        where: {
          id: productId,
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
