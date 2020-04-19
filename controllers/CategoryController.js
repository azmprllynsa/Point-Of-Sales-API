/* eslint-disable no-const-assign */
const { Category } = require('../models');
const helpers = require('../helpers/response');

module.exports = {
  insertCategory: (async (req, res) => {
    const response = {};
    try {
      const { body } = req;
      const data = await Category.create(body);
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
};
