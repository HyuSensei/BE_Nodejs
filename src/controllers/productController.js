const productService = require("../services/productService");
const storeProduct = async (req, res) => {
  let data = await productService.storeNewProduct(req.body);
  return res.status(200).json({
    data,
  });
};
const indexProduct = async (req, res) => {
  let data = await productService.indexGetProduct();
  return res.status(200).json({
    data,
  });
};
const updateProduct = async (req, res) => {
  let data = await productService.updateNewProduct(req.body);
  return res.status(200).json(data);
};

const createProduct = (req, res) => {};

const editProduct = (req, res) => {};

const destroyProduct = (req, res) => {};

const showProduct = async (req, res) => {
  let data = await productService.showDetailProduct(req.params.id);
  return res.status(200).json(data);
};
module.exports = {
  storeProduct,
  updateProduct,
  createProduct,
  editProduct,
  destroyProduct,
  showProduct,
  indexProduct,
};
