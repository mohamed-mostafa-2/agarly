const express = require("express");
const authController = require("../controllers/auth.controller");

const {
  addProductToWishlist,
  removeProductFromWishlist,
  getLoggedUserWishlist,
} = require("../controllers/wishlist.controller");

const router = express.Router();

router.route("/").get(authController.protect, getLoggedUserWishlist);

router
  .route("/:productId")
  .delete(authController.protect, removeProductFromWishlist)
  .post(authController.protect, addProductToWishlist);

module.exports = router;
