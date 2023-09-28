const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");
const apiAuth = require("../api/user/apiAuth");
const apiOrder = require("../api/user/apiOrder");
const apiRate = require("../api/user/apiRate");
const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");

const middleware = require("../middleware/JWTAction");

router.get("/", apiProduct.getProductHome1);

router.get("/login", middleware.checkLoginUser);
router.post("/login", apiAuth.handleLogin);

router.get("/register", (req, res) => {
  let erro = req.flash("erro");
  let success = req.flash("success");
  return res.render("user/register.ejs", { success, erro });
});

router.get("/logout", (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.cookie("UserId", "", { maxAge: 0 });
  res.cookie("name", "", { maxAge: 0 });
  res.cookie("email", "", { maxAge: 0 });
  res.cookie("phone", "", { maxAge: 0 });
  res.cookie("username", "", { maxAge: 0 });
  res.cookie("address", "", { maxAge: 0 });
  return res.redirect("/login");
});
router.post("/register", apiAuth.handleRegister);

router.get("/contact", (req, res) => {
  return res.render("user/contact.ejs");
});

router.get("/detail/:id", apiProduct.getProductDetail);

router.get("/addCart/:id", cartController.handleAddCart);
router.get("/viewCart", (req, res) => {
  let erro = req.flash("erro");
  let success = req.flash("success");
  let carts = req.session.cart;
  let total = 0;
  let sum = 0;
  for (let i = 0; i < carts.length; i++) {
    sum = carts[i].price * carts[i].quantity;
    total += sum;
  }
  //console.log("Cart", carts);
  return res.render("user/cart.ejs", { carts, total, success, erro });
});
router.get("/deleteCart/:id", cartController.deleteCart);
router.get("/increaseCart/:id", cartController.upCart);
router.get("/decreaseCart/:id", cartController.deCart);

router.post("/order", middleware.requireLogin, apiOrder.order);
router.get(
  "/orderConfirm/:UserId",
  middleware.requireLogin,
  apiOrder.getOrderConfirm
);
router.get(
  "/orderShip/:UserId",
  middleware.requireLogin,
  apiOrder.getOrderShip
);
router.get(
  "/orderComplete/:UserId",
  middleware.requireLogin,
  apiOrder.getOrderComplete
);
router.get(
  "/updateStatusOrder/:orderId",
  middleware.requireLogin,
  apiOrder.updateStatusOrder
);

router.post("/rateOrderAction", middleware.requireLogin, apiRate.handleRate);
router.get(
  "/rateOrder/user=:userId/order=:orderId",
  middleware.requireLogin,
  apiOrder.getOrderRate
);

router.get("/user", middleware.requireLogin, userController.showUser);

module.exports = router;
