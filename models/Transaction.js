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
      Transaction.belongsTo(models.Executive);
      Transaction.belongsTo(models.Commission);
      Transaction.belongsTo(models.Concept);
    }
  }
  Transaction.init({
    inicial_amount: DataTypes.FLOAT,
    final_amount: DataTypes.FLOAT,
    type: DataTypes.BOOLEAN,
    amount: DataTypes.FLOAT,
    ExecutiveId: DataTypes.INTEGER,
    CommissionId: DataTypes.INTEGER,
    ConceptId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Transaction',
  });
  return Transaction;
};