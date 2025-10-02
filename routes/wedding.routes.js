const express = require("express");
const router = express.Router();
const controller = require("../controllers/wedding.controller");
const imageController = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .post(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.createWedding
  )
  .get(controller.getAllWedding);

router
  .route("/:id")
  .get(controller.getWedding)
  .put(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.updateWedding
  )
  .delete(
    authController.protect,
    authController.allowedTo("Admin", "Agent"),
    controller.deleteWedding
  );
module.exports = router;
