const express = require("express");
const router = express.Router();
const controller = require("../controllers/car.controller");
const imageController = require("../controllers/product.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .post(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.createCar
  )
  .get(controller.getCars);

router
  .route("/:id")
  .get(controller.getCar)
  .put(
    authController.protect,
    authController.allowedTo("Manager", "Admin", "Agent"),
    imageController.uploadProductImage,
    imageController.resizeImage,
    controller.updateCar
  )
  .delete(
    authController.protect,
    authController.allowedTo("Admin", "Agent"),
    controller.deleteCar
  );

module.exports = router;
