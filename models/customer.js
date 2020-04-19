
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {});
  // customer.associate = (models) => {
  //   // associations can be defined here
  //   customer.belongsTo(models.order, {
  //     foreignKey: 'id',
  //     as: 'customerId',
  //     sourceKey: 'id',
  //   });
  // };
  return Customer;
};
