'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Creditdetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Creditdetail.belongsToMany(models.Account,{through:'AccountCreditdetails'})
    }
  }
  Creditdetail.init({
    name:DataTypes.STRING,
    interest: DataTypes.FLOAT,
    extra_charge: DataTypes.FLOAT
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Creditdetail',
  });
  return Creditdetail;
};