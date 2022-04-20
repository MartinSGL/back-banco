'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cut extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cut.belongsTo(models.Cashbox)
      Cut.belongsTo(models.Executive)
      // Cut.belongsToMany(models.Denomination,{through:'DenominationCut'})
    }
  }
  Cut.init({
    total_cut: DataTypes.FLOAT,
    total_system: DataTypes.FLOAT,
    type: {
      allowNull: false,
      type: DataTypes.ENUM("inital","final","especial")
    },
    CashboxId: DataTypes.INTEGER,
    ExecutiveId: DataTypes.INTEGER
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Cut',
  });
  return Cut;
};