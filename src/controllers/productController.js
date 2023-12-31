const productService = require("../services/productService");
const storeProduct = async (req, res) => {
  let data = await productService.storeNewProduct(req.body);
  return res.json(data);
};
const indexProduct = async (req, res) => {
  let data = await productService.indexGetProduct();
  return res.json(data);
};

const getProductCategory = async (req, res) => {
  let data = await productService.getProductByName(req.params.page);
  return res.json(data);
};
const updateProduct = async (req, res) => {
  console.log("kkk", req.body);
  let data = await productService.updateNewProduct(req.body);
  return res.json(data);
};

const createProduct = (req, res) => {};

const editProduct = (req, res) => {};

const destroyProduct = async (req, res) => {
  let data = await productService.deleteProduct(req.params.id);
  return res.json(data);
};

const showProduct = async (req, res) => {
  let data = await productService.showDetailProduct(req.params.id);
  return res.json(data);
};

const getProductByName = async (req, res) => {
  let data = await productService.getProductByName(req.body.name);
  return res.json(data);
  // const name = req.query.name;
  // res.send(`Xin chào, ${name}!`);
};
const getCountProduct = async (req, res) => {
  let data = await productService.countProduct();
  return res.json(data);
};
const getProductLimit = async (req, res) => {
  let data = await productService.getProductLimit(req.params.currentPage);
  return res.json(data);
};
module.exports = {
  storeProduct,
  updateProduct,
  createProduct,
  editProduct,
  destroyProduct,
  showProduct,
  indexProduct,
  getProductByName,
  getProductCategory,
  getCountProduct,
  getProductLimit,
};
