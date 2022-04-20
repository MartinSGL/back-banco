'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Position extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Position.hasMany(models.Area)
    }
  }
  Position.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Position',
  });
  return Position;
};