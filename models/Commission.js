'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Commission.hasMany(models.Transaction)
    }
  }
  Commission.init({
    name: DataTypes.STRING,
    amount: DataTypes.FLOAT
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Commission',
  });
  return Commission;
};