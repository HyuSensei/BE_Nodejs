"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here\
      Product.belongsTo(models.Category);
      Product.belongsToMany(models.Order, { through: "Order_Product" });
      Product.hasMany(models.Order_Product, { foreignKey: "ProductId" });
      Product.hasMany(models.Rate);
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
