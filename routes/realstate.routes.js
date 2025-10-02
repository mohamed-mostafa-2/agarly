const express = require("express");
const router = express.Router();
const controller = require("../controllers/realstate.controller");
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
    controller.createRealState
  )
  .get(controller.getAllRealState);

router
  .route("/:id")
  .get(controller.getRealState)
  .put(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.updateRealState
  )
  .delete(
    authController.protect,
    authController.allowedTo("Admin", "Agent"),
    controller.deleteRealState
  );
module.exports = router;
