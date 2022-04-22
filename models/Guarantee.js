'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guarantee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Guarantee.belongsTo(models.Mortgage)
      Guarantee.hasMany(models.Propertie)
    }
  }
  Guarantee.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    address: DataTypes.STRING,
    telephone: DataTypes.STRING,
    MortgageId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Guarantee',
  });
  return Guarantee;
};