const axios = require("axios");
const getProductHome1 = async (req, res) => {
  try {
    let dataProducts = await axios.get(`http://localhost:8081/api/v1/products`);
    let products = dataProducts.data.product;
    let cookie = req.cookies;
    return res.render("user/home.ejs", {
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await axios.get(`http://localhost:8081/api/v1/products/${id}`);
    let product = data.data.product;
    if (data.data.success !== false) {
      return res.render("user/product_detail.ejs", {
        product,
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

const getProductHome2 = () => {};

module.exports = {
  getProductHome1,
  getProductHome2,
  getProductDetail,
};
