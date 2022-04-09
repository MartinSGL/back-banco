'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Client.belongsTo(models.Executive)
      Client.hasMany(models.Account)
      Client.hasMany(models.Token)
    }
  }
  Client.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    street: DataTypes.STRING,
    number_ext: DataTypes.INTEGER,
    colony: DataTypes.STRING,
    postalcode: DataTypes.INTEGER,
    city: DataTypes.STRING,
    municipality: DataTypes.STRING,
    state: DataTypes.STRING,
    celphone: DataTypes.STRING,
    landline: DataTypes.STRING,
    curp: DataTypes.STRING,
    rfc: DataTypes.STRING,
    no_ine: DataTypes.STRING,
    email: DataTypes.STRING,
    ExecutiveId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Client',
  });
  return Client;
};