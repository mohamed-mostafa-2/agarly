const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");
const ApiError = require("../utils/apiError");

// @desc Add product to wishlist

exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: { wishlist: productId },
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product added to wishlist",
    wishlist: user.wishlist,
  });
});

// @desc Remove product from wishlist

exports.removeProductFromWishlist = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;

  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $pull: { wishlist: productId },
    },
    { new: true }
  );

  if (!user) {
    return next(new ApiError("User not found", 404));
  }

  res.status(200).json({
    status: "success",
    message: "Product removed from wishlist",
    wishlist: user.wishlist,
  });
});

// @desc Get user's wishlist

exports.getLoggedUserWishlist = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  if (!user) {
    return next(new ApiError("User not found", 404));
  }
  res.status(200).json({
    status: "success",
    message: "User's wishlist retrieved successfully",
    wishlist: user.wishlist,
  });
});
