const express = require("express");
const router = express.Router();
const upload = require("../middleware/UploadImg")

const authController = require("../controllers/authentication/authController");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const roleController = require("../controllers/roleController");
const middleware = require("../middleware/JWTAction");

//router.all("*", middleware.checkLogin, middleware.checkPremission);

router.post("/register", authController.registerUser);
router.post("/login", authController.loginUser);
router.get("/logout", authController.logoutUser);

router.get("/users", userController.indexUser);
router.get("/users/:id", userController.showUser);
router.get("/users/create", userController.createUser);
router.post("/users", userController.searchByUserName);
router.get("/users/update", userController.editUser);
router.post("/users/update", userController.updateUser);
router.delete("/users/:id", userController.destroyUser);

router.post("/products/create", productController.storeProduct);
router.get("/products", productController.indexProduct);
router.get("/products/:id", productController.showProduct);
router.get("/products/delete/:id", productController.destroyProduct);
router.post("/products/getbyname", productController.getProductByName);

router.post("/products/update", upload.single('image'), productController.updateProduct);


router.get("/categories", categoryController.indexCategory);


router.get("/role", roleController.indexRole);
router.get("/role/:id", roleController.roleById);

module.exports = router;
