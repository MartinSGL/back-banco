'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Interest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Interest.belongsTo(models.Debterm)
      Interest.hasMany(models.Mortgage)
    }
  }
  Interest.init({
    name:DataTypes.STRING,
    date: DataTypes.DATE,
    insterest: DataTypes.FLOAT,
    extra_charge: DataTypes.FLOAT,
    DebtermId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Interest',
  });
  return Interest;
};