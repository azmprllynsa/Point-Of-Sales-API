
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_id: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {});
  // User.associate = function (models) {
    // associations can be defined here
  // };
  return User;
};
