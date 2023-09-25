const db = require("../models/index");

const getProduct = async (productId) => {
  try {
    let data = await db.Product.findOne({
      where: { id: productId },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const handleAddCart = async (req, res) => {
  let data = await getProduct(req.params.id);
  let name = data.name;
  let price = data.price;
  let id = req.params.id;
  let image = data.image;
  let count = 0;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id == id) {
      req.session.cart[i].quantity += 1;
      count++;
    }
  }
  if (count === 0) {
    cart_data = {
      id: id,
      name: name,
      price: price,
      image: image,
      quantity: 1,
    };
    req.session.cart.push(cart_data);
  }
  //console.log(req.session.cart);
  return res.redirect("/");
};

const deleteCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart.splice(i, 1);
    }
  }
  return res.redirect("/viewCart");
};

const upCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart[i].quantity++;
    }
  }
  return res.redirect("/viewCart");
};

const deCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart[i].quantity--;
      if (req.session.cart[i].quantity === 0) {
        req.session.cart.splice(i, 1);
      }
    }
  }
  return res.redirect("/viewCart");
};

module.exports = {
  handleAddCart,
  getProduct,
  deleteCart,
  upCart,
  deCart,
};
