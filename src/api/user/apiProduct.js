const axios = require("axios");
require("dotenv").config();
const getProductHome1 = async (req, res) => {
  try {
    //console.log("ssss:", process.env.BASE_URL + `products`)
    let dataProducts = await axios.get(process.env.BASE_URL +`products`);
    // console.log("Data:", dataProducts.data.data);
    
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
