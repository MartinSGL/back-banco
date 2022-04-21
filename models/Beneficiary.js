"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Beneficiary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Beneficiary.belongsTo(models.Account);
    }
  }
  Beneficiary.init(
    {
      name: DataTypes.STRING,
      lastname: DataTypes.STRING,
      relation: DataTypes.STRING,
      percentage: DataTypes.INTEGER,
      birth_date: DataTypes.DATE,
      phone: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Beneficiary",
    }
  );
  return Beneficiary;
};
