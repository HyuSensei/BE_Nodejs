const axios = require("axios");
require("dotenv").config();
const getProductHome1 = async (req, res) => {
  try {

    //console.log("ssss:", process.env.BASE_URL + `products`)
    let dataProducts = await axios.get(process.env.BASE_URL +`products`);
    // console.log("Data:", dataProducts.data.data);
    
    let products = dataProducts.data.product;

    let cookie = req.cookies;
    //console.log(cookie)
    return res.render("user/home.ejs", {
      products: products,
      cookie: cookie,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await axios.get(process.env.BASE_URL+`products/${id}`);
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
const getProductDetail2 = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await axios.get(process.env.BASE_URL + `products/${id}`);
    let data2 = await axios.get(process.env.BASE_URL + `categories`);
    let product = data.data.product;
    let categories = data2.data.categories;
    if (data.data.success !== false) {
      return res.render("admin/editProduct.ejs", { product, categories});
    }
  } catch (error) {
    console.log("Error:", error);
  }
};



const getProductHome2 = async (req, res) => {
  try {
    let cookie = req.cookies;
    console.log("cookey",cookie.UserId)
    if (typeof cookie.UserId == 'undefined') {
      return res.render('success.ejs', { message: "vui lòng đăng nhập để vào trang", url: '/' })
    }
    //console.log("ssss:", process.env.BASE_URL + `products`)
    let dataProducts = await axios.get(process.env.BASE_URL + `products`);
    // console.log("Data:", dataProducts.data.data);

    let products = dataProducts.data.product;

    
    return res.render("admin/productAdmin.ejs", {
      products: products,
      cookie: cookie,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductByName = async (req, res) => {
  try {
    let name = req.body.name;
    if (name == '') {
      return res.render('success.ejs', { message: "vui lòng nhập tên sản phẩm", url: '/admin/product/' })
    } else {
      let data = await axios.post(process.env.BASE_URL + `products/getbyname/?name=${name}`);
      if (data.data.success !== false) {
        let products = data.data.product;

        let cookie = req.cookies;
        console.log("a",name)
        
        return res.render("admin/productAdmin.ejs", {
          products: products,
          cookie: cookie,
          nameSearch: name,
        });
      } else {
        return res.render('admin/productAdmin.ejs', { message: `không tìm thấy sản phẩm nào có tên: ${name}`, nameSearch: name, })
      }
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await axios.get(process.env.BASE_URL + `/products/delete/${id}`);
    if (data.data.success !== false) {
      return res.render('success.ejs', { message: "xóa sản phẩm thành công", url: '/admin/product/' })
    } else {
      return res.render('success.ejs', { message: "xóa sản phẩm thất bại", url: '/admin/product/' })
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
const updateProduct = async (req, res) => {
  try {

    //console.log("ssss:", process.env.BASE_URL + `products`)
    
    datasend = {
      body: req.body,
      file: req.file
    }
    let dataProducts = await axios.post(process.env.BASE_URL + `/products/update`, datasend);
    console.log("Data:", req.file);
    //console.log(dataProducts.data.product.id)
  
    if (dataProducts.data.success !== false) {
      return res.render('success.ejs', { message: "sửa sản phẩm thành công", url: `/admin/product/edit/${dataProducts.data.product.id}` })
    } else {
      return res.render('success.ejs', { message: "sửa sản phẩm thất bại", url: `/admin/product/edit/${dataProducts.data.product.id}` })
    }
  } catch (error) {
    console.log(error);
  }
};
const getCreateProduct = async (req, res) => {
  try {

    let data2 = await axios.get(process.env.BASE_URL + `categories`);
    let categories = data2.data.categories;
    if (data2.data.success !== false) {
      let err = req.flash("err");
      let success = req.flash("success");
      return res.render("admin/createProduct.ejs", { success, err, categories }) 
    }
  } catch (error) {
    console.log("Error:", error);
  }
};
const createProduct = async (req, res) => {
  try {
    datasend = {
      body: req.body,
      file: req.file
    }
    let dataProducts = await axios.post(process.env.BASE_URL + `/products/create`, datasend);
    //console.log("Data create:", datasend);
    if (dataProducts.data.success !== false) {
      req.flash("success", `${dataProducts.data.message}`);
      res.redirect("/admin/product/create")
    } else {
      req.flash("err", `${dataProducts.data.message}`);
      res.redirect("/admin/product/create")
    } 
  } catch (error) {
    console.log("loi tao san pham moi",error);
  }
};
module.exports = {
  getProductHome1,
  getProductHome2,
  getProductDetail,
  deleteProduct,
  getProductByName,
  getProductDetail2,
  updateProduct,
  createProduct,
  getCreateProduct
};
