"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rate.belongsTo(models.User);
      Rate.belongsTo(models.Order);
      Rate.belongsTo(models.Product);
    }
  }
  Rate.init(
    {
      ProductId: DataTypes.INTEGER,
      OrderId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
      star: DataTypes.INTEGER,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rate",
    }
  );
  return Rate;
};
