'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Card.belongsTo(models.Account);
      Card.belongsTo(models.Executive);
    }
  }
  Card.init({
    card_number: DataTypes.STRING,
    nip: DataTypes.INTEGER,
    expiration_date: DataTypes.DATE,
    ExecutiveId: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Card',
  });
  return Card;
};