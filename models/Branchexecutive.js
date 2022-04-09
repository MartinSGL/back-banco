'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BranchExecutives extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Branch,Executive}) {
      Branch.belongsToMany(Executive,{through:'BranchExecutives'})
      Executive.belongsToMany(Branch,{through:'BranchExecutives'})
    }
  }
  BranchExecutives.init({
    date_init: DataTypes.DATE,
    date_end: DataTypes.DATE,
    ExecutiveId: DataTypes.INTEGER,
    BranchId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'BranchExecutives',
  });
  return BranchExecutives;
};