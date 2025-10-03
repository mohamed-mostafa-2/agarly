const express = require("express");
const router = express.Router();
const controller = require("../controllers/user.controller");
const imageController = require("../controllers/product.controller");
const subCategoryRoute = require("./subCategory.routes");
const authController = require("../controllers/auth.controller");
const { parseBody } = require("../middlewares/parseBody");

router.use("/:categoryId/subCategory", subCategoryRoute);
router
  .route("/")
  .post(
    authController.protect,
    authController.allowedTo("Admin"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    parseBody,
    controller.createUser
  )
  .get(controller.getAllUsers);

router
  .route("/:id")
  .get(controller.getUser)
  .put(
    authController.protect,
    authController.allowedTo("Admin"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    parseBody,
    controller.updateUser
  )
  .delete(
    authController.protect,
    authController.allowedTo("Admin"),
    controller.deleteUser
  );

module.exports = router;
