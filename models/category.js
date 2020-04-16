
module.exports = (sequelize, DataTypes) => {
  const category = sequelize.define('category', {
    name: DataTypes.STRING,
  }, {});
  category.associate = (models) => {
    // associations can be defined here
    category.hasMany(models.product, {
      foreignKey: 'id',
      as: 'productCategory',
      sourceKey: 'id',
    });
  };
  return category;
};
