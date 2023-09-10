const axios = require("axios");
const getProductHome1 = async (req, res) => {
  try {
    let dataProducts = await axios.get(`http://localhost:8081/api/v1/products`);
    //console.log("Data:", dataProducts.data.data);
    let products = dataProducts.data.data.product;
    return res.render("user/home.ejs", {
      products,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductHome2 = () => {};

module.exports = {
  getProductHome1,
  getProductHome2,
};
