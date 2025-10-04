const express = require("express");
const router = express.Router();
const controller = require("../controllers/order.controller");
const authController = require("../controllers/auth.controller");

router
  .route("/")
  .post(
    authController.protect,
    authController.allowedTo("User", "Admin", "Agent"),
    controller.checkoutOrder
  )
  .get(controller.getAllOrders);


module.exports = router;
