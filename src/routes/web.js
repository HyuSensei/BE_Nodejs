const express = require("express");
const router = express.Router();
const apiProduct = require("../api/user/apiProduct");

// router.get("/", (req, res) => {
//   res.render("user/home.ejs");
// });

router.get("/", apiProduct.getProductHome1);

module.exports = router;
