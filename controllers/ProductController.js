/* eslint-disable no-const-assign */
const { Op } = require('sequelize');
const { Product } = require('../models');
const helpers = require('../helpers/response');
const { Category } = require('../models');

module.exports = {
  insertProduct: (async (req, res) => {
    let response = {};
    try {
      const input = req.body;
      input.image = `http://${req.get('host')}/${req.file.path.replace(/\\/g, '/')}`;
      const data = await Product.create(input);
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
    let pagination = {};
    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 9;
      const offset = (page * limit) - limit;
      const path = `http://${req.get('host') + req.baseUrl}?page`;
      const { search } = req.query;
      // eslint-disable-next-line prefer-const
      let param = {};
      let searchParam = {};
      const { sort } = req.query;
      const include = [{
        model: Category,
        as: 'productCategory',
        attributes: ['name'],
      },
      ];
      let sortType = req.query.sort_type || '';
      sortType = sortType.toUpperCase() || 'ASC';
      if (sort !== undefined) {
        param.order = [[sort, sortType]];
      }
      param.offset = offset;
      param.limit = limit;
      param.include = include;

      if (search !== undefined) {
        const where = {
          [Op.or]: [
            { title: { [Op.substring]: search } },
            { description: { [Op.substring]: search } },
          ],
        };
        param.where = where;
        searchParam = { where };
      }
      const data = await Product.findAll(param);
      const count = await Product.count(searchParam);
      pagination = {
        current_page: page,
        offset,
        limit,
        total_data: count,
        per_page: data.length,
        path,
      };
      if (data === null) {
        pagination.status = 404;
        pagination.message = 'Data Not Found';

        helpers.pagination(res, req.query, pagination);
      } else {
        pagination.status = 200;
        pagination.message = 'OK';
        pagination.data = data;

        helpers.pagination(res, req.query, pagination);
      }
    } catch (err) {
      // pagination = {};
      pagination.status = 500;
      pagination.message = 'Internal Server Error';
      pagination.err = err;

      helpers.pagination(res, req.query, pagination);
    }
  }),
  detailProduct: (async (req, res) => {
    let response = {};
    try {
      const { productId } = req.params;
      const data = await Product.findOne({
        exclude: ['createdAt', 'updatedAt'],
        include: {
          model: Category,
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

      const [edit] = await Product.update(body, {
        where: {
          id: productId,
        },
      });
      const data = await Product.findOne({
        where: {
          id: productId,
        },
      });

      if (edit === 1) {
        response.status = 200;
        response.message = 'Product Successfully Edited';
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
      const data = await Product.destroy({
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
