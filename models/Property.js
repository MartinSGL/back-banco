'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsTo(models.Guarantee)
    }
  }
  Property.init({
    url: DataTypes.STRING,
    value: DataTypes.FLOAT,
    GuaranteeId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Property',
  });
  return Property;
};