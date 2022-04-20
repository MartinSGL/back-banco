'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Area extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Area.hasMany(models.Executive)
      Area.belongsTo(models.Position)
    }
  }
  Area.init({
    name: DataTypes.STRING,
    PositionId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Area',
  });
  return Area;
};