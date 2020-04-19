
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    image: DataTypes.STRING,
    id_category: DataTypes.INTEGER,
  }, {});
  Product.associate = (models) => {
    // associations can be defined here
    Product.belongsTo(models.Category, {
      foreignKey: 'id_category',
      as: 'productCategory',
      sourceKey: 'id',
    });
  };
  return Product;
};
