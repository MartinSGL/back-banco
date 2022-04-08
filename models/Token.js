'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Token.belongsTo(models.Client)
    }
  }
  Token.init({
    token: DataTypes.STRING,
    expire_date: DataTypes.DATE,
    ClientId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Token',
  });
  return Token;
};