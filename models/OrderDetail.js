/* eslint-disable camelcase */

module.exports = (sequelize, DataTypes) => {
  const OrderDetail = sequelize.define('OrderDetail', {
    order_id: DataTypes.STRING,
    product_id: DataTypes.STRING,
    product_quantity: DataTypes.STRING,
  }, {
    tableName: 'order_details',
  });
  OrderDetail.associate = (models) => {
    // associations can be defined here
    OrderDetail.hasMany(models.Product, {
      foreignKey: 'id',
      as: 'product',
      sourceKey: 'product_id',
    });
  };
  return OrderDetail;
};
