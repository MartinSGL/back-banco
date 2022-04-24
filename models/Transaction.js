'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Transaction.belongsTo(models.Executive)
      Transaction.belongsTo(models.Commission)
      Transaction.belongsTo(models.Concept)
      Transaction.belongsTo(models.Card)
    }
  }
  Transaction.init({
    amount: DataTypes.FLOAT,
    ExecutiveId: DataTypes.INTEGER,
    CommissionId: DataTypes.INTEGER,
    ConceptId: DataTypes.INTEGER,
    CardId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};