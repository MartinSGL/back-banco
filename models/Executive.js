'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Executive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Executive.belongsTo(models.Area)
        Executive.belongsTo(models.Position)
        Executive.hasMany(models.Client)
        Executive.hasMany(models.Account)
        Executive.hasMany(models.Card)
        Executive.hasMany(models.Cut)
        Executive.hasMany(models.Transaction)
    }
    toJSON(){
      return {...this.get(),id:undefined,AreaId:undefined,PositionId:undefined,BranchId:undefined}
    }
  }
  Executive.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    AreaId: DataTypes.INTEGER,
    PositionId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Executive',
  });
  return Executive;
};