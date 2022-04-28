'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.belongsTo(models.Client)
      Account.belongsTo(models.Executive)
      Account.hasMany(models.Card)
      Account.hasMany(models.Beneficiary)
      Account.hasOne(models.Mortgage)
      Account.belongsToMany(models.Creditdetail,{through:'AccountCreditdetails'})
    }
  }
  Account.init({
    no_acc: {
      type:DataTypes.STRING,
    
     },
    type: {
      type: DataTypes.ENUM("credit","debit","mortgage")
    },
    amount: DataTypes.FLOAT,
    ExecutiveId: DataTypes.INTEGER,
    ClientId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Account',
  });
  return Account;
};