"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AccountCreditdetail extends Model {
    static associate(models) {}
  }
  AccountCreditdetail.init(
    {
        AccountId: DataTypes.INTEGER,
        CreditdetailId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: "AccountCreditdetail",
    }
  );
  return AccountCreditdetail;
};
