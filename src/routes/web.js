const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");
const apiAuth = require("../api/user/apiAuth");
const apiOrder = require("../api/user/apiOrder");
const apiRate = require("../api/user/apiRate");
const cartController = require("../controllers/cartController");
const userController = require("../controllers/userController");
const apiUser = require("../api/admin/apiUser");

const middleware = require("../middleware/JWTAction");
const upload = require("../middleware/UploadImg")
const JWTAction = require("../middleware/JWTAction")
const apiAdmin = require("../api/admin/apiAdmin");

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
  res.cookie("User", "", { maxAge: 0 });
  return res.redirect("/login");
});
router.post("/register", apiAuth.handleRegister);

router.get("/contact", (req, res) => {
  return res.render("user/contact.ejs");
});

router.get("/detail/:id", apiProduct.getProductDetail);


// admin

router.get("/admin", JWTAction.checkPremission, apiAdmin.getHome);
//get all product
router.get("/admin/product", JWTAction.checkPremission, apiProduct.getProductHome2);
//delete product
router.get("/admin/product/delete/:id", JWTAction.checkPremission, apiProduct.deleteProduct);
//get product by name
router.post("/admin/product", JWTAction.checkPremission, apiProduct.getProductByName);
//edit product
router.get("/admin/product/edit/:id", JWTAction.checkPremission, apiProduct.getProductDetail2);
router.post("/admin/product/edit", JWTAction.checkPremission, upload.single('image') ,apiProduct.updateProduct);
//create product
router.get("/admin/product/create", JWTAction.checkPremission, apiProduct.getCreateProduct);
router.post("/admin/product/create", JWTAction.checkPremission, upload.single('image'), apiProduct.createProduct);


//crud user
router.get("/admin/user", JWTAction.checkPremission, apiUser.getUserHome);
router.get("/admin/user/delete/:id", JWTAction.checkPremission, apiUser.deleteUser);
router.post("/admin/user/", JWTAction.checkPremission, apiUser.getUserByUserName);
router.get("/admin/user/update/:id", JWTAction.checkPremission, apiUser.getUpdateUser);
router.post("/admin/user/update", JWTAction.checkPremission, apiUser.UpdateUser);

router.get("/addCart/:id", cartController.handleAddCart);
router.get("/viewCart", (req, res) => {
  let carts = req.session.cart;
  let total = 0;
  let sum = 0;
  for (let i = 0; i < carts.length; i++) {
    sum = carts[i].price * carts[i].quantity;
    total += sum;
  }
  //console.log("Cart", carts);
  return res.render("user/cart.ejs", { carts, total });
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
router.get("/updateStatusOrder/:orderId", apiOrder.updateStatusOrder);

router.post("/rateOrderAction", apiRate.handleRate);
router.get("/rateOrder/user=:userId/order=:orderId", apiOrder.getOrderRate);

router.get("/user", middleware.requireLogin, userController.showUser);




module.exports = router;
