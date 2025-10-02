const express = require("express");
const router = express.Router();
const controller = require("../controllers/clothing.controller");
const imageController = require("../controllers/product.controller");
const subCategoryRoute = require("./subCategory.routes");
const authController = require("../controllers/auth.controller");

router.use("/:categoryId/subCategory", subCategoryRoute);
router
  .route("/")
  .post(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.createClothe
  )
  .get(controller.getClothes);

router
  .route("/:id")
  .get(controller.getClothe)
  .put(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.updateClothe
  )
  .delete(
    authController.protect,
    authController.allowedTo("Admin", "Agent"),
    controller.deleteClothe
  );
module.exports = router;
