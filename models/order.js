
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    invoice: DataTypes.STRING,
    user_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    order_quantity: DataTypes.STRING,
    ammount: DataTypes.STRING,
    tax_ammount: DataTypes.STRING,
    net_ammount: DataTypes.STRING,
  }, {});
  Order.associate = (models) => {
    // associations can be defined here
    Order.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
      sourceKey: 'id',
    });
    Order.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'cashier',
      sourceKey: 'id',
    });
    Order.hasMany(models.OrderDetail, {
      foreignKey: 'order_id',
      as: 'orderDetail',
    });
  };
  return Order;
};
