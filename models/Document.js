'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Document extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Document.belongsTo(models.Client);
    }
  }
  Document.init({
    document_url: DataTypes.STRING,
    type: DataTypes.ENUM("ine","address","income")
  }, {
    sequelize,
    paranoid:true,
    modelName: 'Document',
  });
  return Document;
};