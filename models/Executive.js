'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Executive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Executive.belongsTo(models.Area)
        Executive.hasMany(models.Client)
        Executive.hasMany(models.Account)
        Executive.hasMany(models.Card)
        Executive.hasMany(models.Cut)
        Executive.hasMany(models.Transaction)
    }
    // toJSON(){
    //   return {...this.get(),id:undefined,AreaId:undefined,PositionId:undefined}
    // }
  }
  Executive.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    userid: DataTypes.STRING,
    password: DataTypes.STRING,
    AreaId: DataTypes.INTEGER
  },{
    hooks:{
      beforeCreate: async (executive) => {
        const salt = await bcrypt.genSalt(10)
        const passH = await bcrypt.hash(executive.password,salt)
        return executive.password = passH;
      },
    },
    sequelize,
    paranoid:true,
    modelName: 'Executive',
  });
  return Executive;
};