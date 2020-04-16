
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
  }, {});
  product.associate = (models) => {
    // associations can be defined here
    product.belongsTo(models.category, {
      foreignKey: 'id_category',
      as: 'productCategory',
      sourceKey: 'id',
    });
  };
  return product;
};
