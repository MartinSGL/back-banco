'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Branch extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
    }
    toJSON(){
      return {...this.get(),id:undefined}
    }
  }
  Branch.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    ceo: DataTypes.STRING,
    description: DataTypes.STRING,
    security: DataTypes.STRING
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Branch',
  });
  return Branch;
};