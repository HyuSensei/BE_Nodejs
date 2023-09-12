const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");
const apiAuth = require("../api/user/apiAuth");
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
  return res.redirect("/");
});
router.post("/register", apiAuth.handleRegister);

router.get("/contact", (req, res) => {
  return res.render("user/contact.ejs");
});

router.get("/detail/:id", apiProduct.getProductDetail);

module.exports = router;
