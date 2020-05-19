/* eslint-disable vars-on-top */
/* eslint-disable no-const-assign */
const {
  Order,
} = require('../models');
const helpers = require('../helpers/response');
const {
  Customer,
  User,
  OrderDetail,
  Product,
} = require('../models');
const mail = require('../helpers/mail');

module.exports = {
  getOrder: (async (req, res) => {
    let pagination = {};

    try {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 9;
      const path = `http://${req.get('host') + req.baseUrl}?page`;
      const offset = (page * limit) - limit;
      const param = {};
      const { sort } = req.query;
      const include = [{
        model: Customer,
        as: 'customer',
        required: true,
        attributes: ['name', 'email'],
      }, {
        model: User,
        as: 'cashier',
        required: true,
        attributes: ['name'],
      }, {
        model: OrderDetail,
        as: 'orderDetail',
        required: true,
        attributes: ['product_id'],
        include: [{
          model: Product,
          as: 'product',
          attributes: ['name', 'price'],
        }],
      }];
      let sortType = req.query.sort_type || '';
      sortType = sortType.toUpperCase() || 'ASC';
      if (sort !== undefined) {
        param.order = [[sort, sortType]];
      }
      param.offset = offset;
      param.limit = limit;
      param.include = include;

      const data = await Order.findAll(param);
      const count = await Order.count();
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
      pagination = {};
      helpers.pagination(res, req.query, pagination);
    }
  }),

  insertOrder: (async (req, res) => {
    let response = {};
    let ammount = 0;
    try {
      const input = req.body;
      const { products } = input;
      await products.map(async (product, index) => {
        const productData = await Product.findOne({
          where: {
            id: product.id,
          },
        });
        if (productData === null) {
          response.status = 400;
          response.message = `product for product id ${product.id} not found`;

          helpers.generic(res, response);
        } if (productData !== null) {
          if (products.length - 1 > index) {
            const price = productData.price * product.quantity;
            ammount += price;
            console.log(`here ${ammount}`);
          } else {
            console.log(ammount);

            const price = productData.price * product.quantity;
            ammount += price;

            const taxAmmount = ammount * 0.1;
            // generate invouce
            const count = await Order.count();
            const datetime = new Date().toISOString().slice(0, 10).replace(/-/g, '');
            const invoice = `#POS${datetime}${count * 7}`;
            const order = await Order.create({
              invoice,
              user_id: input.user_id,
              customer_id: input.customer_id,
              ammount,
              tax_ammount: taxAmmount,
              net_ammount: ammount + taxAmmount,
            });
            // input order detail
            // eslint-disable-next-line prefer-const
            if (order === undefined) {
              response.status = 400;
              response.message = 'Input Invalid';

              helpers.generic(res, response);
            } else {
              response.status = 201;
              response.message = 'Product Has Been Added';
              response.data = order;

              helpers.generic(res, response);
            }
          }
        }
      });
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
      const {
        orderId,
      } = req.params;
      const data = await Order.findOne({
        include: [{
          model: Customer,
          as: 'customerId',
          required: true,
          attributes: ['name', 'email'],
        }, {
          model: User,
          as: 'userId',
          required: true,
          attributes: ['name'],
        }],
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
      const {
        orderId,
      } = req.params;
      const {
        body,
      } = req;
      const [edit] = await Order.update(body, {
        where: {
          id: orderId,
        },
      });
      const data = await Order.findOne({
        where: {
          id: orderId,
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

  deleteOrder: (async (req, res) => {
    let response = {};
    try {
      const {
        orderId,
      } = req.params;
      const data = await Order.destroy({
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
  sendEmail: (async (req, res) => {
    const response = {};
    const { body } = req;
    const orderId = req.params.order_id;
    try {
      const customer = await Customer.create(body);
      if (customer === undefined) {
        response.status = 400;
        response.message = 'Input Invalid';

        helpers.generic(res, response);
      } else {
        const order = await Order.update({
          customer_id: customer.id,
        },
        {
          where: {
            id: orderId,
          },
        });
        if (order === 0) {
          response.status = 400;
          response.message = 'update order failed';

          helpers.generic(res, response);
        } else {
          const dataEmail = {
            email: customer.email,
          };
          mail.send(dataEmail);

          response.status = 201;
          response.message = 'Email Has Been Sent!';

          helpers.generic(res, response);
        }
      }
    } catch (err) {
      // response = {};
      response.status = 500;
      response.message = 'Internal Server Error';
      response.err = err;

      helpers.generic(res, response);
    }
  }),
};
