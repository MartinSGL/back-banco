'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DenominationCuts extends Model {
    static associate({Denomination,Cut}) {
      Denomination.belongsToMany(Cut,{through:'DenominationCuts'})
      Cut.belongsToMany(Denomination,{through:'DenominationCuts'})
    }
  }
  DenominationCuts.init({
    amount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DenominationCuts',
  });
  return DenominationCuts;
};
