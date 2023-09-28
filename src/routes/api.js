const express = require("express");
const router = express.Router();

const authController = require("../controllers/authentication/authController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const roleController = require("../controllers/roleController");
const orderController = require("../controllers/orderController");
const rateController = require("../controllers/rateController");

const middleware = require("../middleware/JWTAction");
const upload = require("../middleware/UploadImg");

//router.all("*", middleware.checkLogin, middleware.checkPremission);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router.get("/users", userController.indexUser);
router.get("/users/:id", userController.showUser2);
router.get("/users/create", userController.createUser);
router.post("/users", userController.searchByUserName);
router.get("/users/update", userController.editUser);
router.post("/users/update", userController.updateUser);
router.delete("/users/:id", userController.destroyUser);

router.post("/products/create", productController.storeProduct);
router.get("/products", productController.indexProduct);
router.get("/products/:id", productController.showProduct);
router.post("/products/update", productController.updateProduct);
router.post("/products/update", upload.single('image'), productController.updateProduct);
router.get("/products/delete/:id", productController.destroyProduct);
router.post("/products/getbyname", productController.getProductByName);


router.get("/categories", categoryController.indexCategory);


router.get("/role", roleController.indexRole);
router.get("/role/:id", roleController.roleById);
router.get("/order", orderController.indexOrder);

router.get("/statistics", orderController.getStatistics);
router.get("/statisticsByMonht", orderController.getStatisticsByMonht);
router.get("/statisticsByYear", orderController.getStatisticsByYear);


router.post("/order", orderController.handleOrder);
router.get("/orderConfirm/:UserId", orderController.orderConfirm);
router.get("/orderShip/:UserId", orderController.orderShip);
router.get("/orderComplete/:UserId", orderController.orderComplete);
router.get("/orderRate/:userId/:orderId", orderController.viewRateOrder);
router.post("/rateOrder", rateController.handleRate);
router.get("/updateStatusOrder/:orderId", orderController.updateStatus);
router.get("/starDetailProdouct/:productId", rateController.getRate);
module.exports = router;
