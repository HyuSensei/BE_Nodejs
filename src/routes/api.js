const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication/authController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const roleController = require("../controllers/roleController");
const orderController = require("../controllers/orderController");
const rateController = require("../controllers/rateController");
const order_productController = require("../controllers/order_productController");
const middleware = require("../middleware/JWTAction");
const upload = require("../middleware/UploadImg");

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.post("/loginAdmin", authController.loginAdmin);
router.get("/logoutAdmin", authController.logoutAdmin);
router.get("/logout", authController.logoutUser);

router.get("/users", middleware.checkPremission, userController.indexUser);
router.get("/users/:id", userController.showUser2);
router.get("/users/create", userController.createUser);
router.post("/users", userController.searchByUserName);
router.get("/users/update", userController.editUser);
router.post(
  "/users/update",
  middleware.checkPremission,
  userController.updateUser
);
router.delete(
  "/users/:id",
  middleware.checkPremission,
  userController.destroyUser
);

router.post("/products/create", productController.storeProduct);
router.get("/products", productController.indexProduct);
router.get("/products/:id", productController.showProduct);
router.post("/products/update", productController.updateProduct);
router.post(
  "/products/update",
  upload.single("image"),
  productController.updateProduct
);
router.post("/products/update", productController.updateProduct);
router.get("/products/delete/:id", productController.destroyProduct);
router.post("/products/getbyname", productController.getProductByName);
router.get(
  "/products/category/page=:page",
  productController.getProductCategory
);

router.get("/categories", categoryController.indexCategory);
router.get(
  "/categories/sale",
  middleware.checkPremission,
  categoryController.getCategoriesSale
);

router.get("/role", roleController.indexRole);
router.get("/role/:id", roleController.roleById);
router.get("/order", middleware.checkPremission, orderController.indexOrder);

router.get(
  "/statistics",
  middleware.checkPremission,
  orderController.getStatistics
);
router.get(
  "/statisticsByMonht",
  middleware.checkPremission,
  orderController.getStatisticsByMonht
);
router.get(
  "/statisticsByYear",
  middleware.checkPremission,
  orderController.getStatisticsByYear
);

router.post("/order", orderController.handleOrder);
router.get("/orderConfirm/:UserId", orderController.orderConfirm);
router.get("/orderShip/:UserId", orderController.orderShip);
router.get("/orderComplete/:UserId", orderController.orderComplete);
router.get("/orderRate/:userId/:orderId", orderController.viewRateOrder);
router.post("/rateOrder", rateController.handleRate);
router.get("/updateStatusOrder/:orderId", orderController.updateStatus);
router.get("/updateStatusOrder/confirm/:orderId", orderController.handConfirm);
router.delete("/deleteOrder/:orderId", orderController.deleteOrder);
// order product desc
router.get(
  "/order_product/desc",
  middleware.checkPremission,
  order_productController.getAllByDESC
);
router.get(
  "/order_product",
  middleware.checkPremission,
  order_productController.getAll
);

//rate admin
router.get("/allCountRate", rateController.getAllCountRate);

router.get("/starDetailProdouct/:productId", rateController.getRate);

//dung de phan trang
router.get(
  "/prodouct/count",
  middleware.checkPremission,
  productController.getCountProduct
);
router.get(
  "/prodouct/limit/:currentPage",
  middleware.checkPremission,
  productController.getProductLimit
);
module.exports = router;
