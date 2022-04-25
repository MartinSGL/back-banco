'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Mortgage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Mortgage.belongsTo(models.Interest)
      Mortgage.belongsTo(models.Account)
      Mortgage.hasMany(models.Guarantee)
    }
  }
  Mortgage.init({
    solicited_date: DataTypes.DATE,
    aproved_date: DataTypes.DATE,
    solicited_amount: DataTypes.FLOAT,
    aproved_amount: DataTypes.FLOAT,
    InterestId: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Mortgage',
  });
  return Mortgage;
};