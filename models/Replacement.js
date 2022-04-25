'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Replacement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Replacement.belongsTo(models.Card)
    }
  }
  Replacement.init(
    {
      CardId: DataTypes.INTEGER,
      reason: {
        allowNull: false,
        type: DataTypes.ENUM("stoled", "expired", "damaged", "lost"),
      }
    },
    {
      sequelize,
      modelName: "Replacement",
    }
  );
  return Replacement;
};