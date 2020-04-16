
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    invoice: DataTypes.STRING,
    user_id: DataTypes.STRING,
    customer_id: DataTypes.STRING,
    order_quantity: DataTypes.STRING,
    ammount: DataTypes.STRING,
    tax_ammount: DataTypes.STRING,
    net_ammount: DataTypes.STRING,
  }, {});
  order.associate = (models) => {
    // associations can be defined here
    order.belongsTo(models.customer, {
      foreignKey: 'customer_id',
      as: 'customerId',
      sourceKey: 'id',
    });
    order.belongsTo(models.user, {
      foreignKey: 'user_id',
      as: 'userId',
      sourceKey: 'id',
    });
  };
  return order;
};
