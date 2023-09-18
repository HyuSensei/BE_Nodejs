const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");
const apiAuth = require("../api/user/apiAuth");
const middleware = require("../middleware/JWTAction");
const upload = require("../middleware/UploadImg")
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

router.get("/admin", (req, res) => {
  return res.render("admin/indexAdmin.ejs");
});
//get all
router.get("/admin/product", apiProduct.getProductHome2);
//delete
router.get("/admin/product/delete/:id", apiProduct.deleteProduct);
//get by name
router.post("/admin/product", apiProduct.getProductByName);
//edit
router.get("/admin/product/edit/:id", apiProduct.getProductDetail2);


router.post("/admin/product/edit", upload.single('image') ,apiProduct.updateProduct);
router.get("/admin/product/create", apiProduct.getCreateProduct);
router.post("/admin/product/create",upload.single('image'), apiProduct.createProduct);

module.exports = router;
