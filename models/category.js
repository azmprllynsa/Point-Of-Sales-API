
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    name: DataTypes.STRING,
  }, {});
  // Category.associate = (models) => {
  //   // associations can be defined here
  //   Category.hasMany(models.Product, {
  //     foreignKey: 'id',
  //     as: 'productCategory',
  //     sourceKey: 'id',
  //   });
  // };
  return Category;
};
