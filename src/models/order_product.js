"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order_Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order_Product.belongsTo(models.Order, { foreignKey: "OrderId" });
      Order_Product.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Order_Product.init(
    {
      OrderId: DataTypes.INTEGER,
      ProductId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Order_Product",
    }
  );
  return Order_Product;
};
