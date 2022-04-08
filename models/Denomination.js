'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Denomination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Denomination.belongsToMany(models.Cut,{through:'DenominationCut'})
    }
  }
  Denomination.init({
    name:DataTypes.STRING,
    value:DataTypes.FLOAT
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Denomination',
  });
  return Denomination;
};