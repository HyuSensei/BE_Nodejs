const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");
const apiAuth = require("../api/user/apiAuth");
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
  return res.redirect("/");
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
module.exports = router;
