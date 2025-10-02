const userModel = require("../models/user.model");
const asyncHandler = require("express-async-handler");
const factory = require("./handlerFactory");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

// @desc get list of all car
// @route GET /api/v1/car
// @access Public

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

exports.getAllUsers = factory.getAll(userModel);

// @desc Get specific car by id
// @route GET /api/v1/car/:id
// @access Public

exports.getUser = factory.getOne(userModel);

// nested route
// Post /api/v1/category/:categoryId/User
exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc Create User
// @route POST /api/v1/User
// @access Private

exports.createUser = factory.createOne(userModel);

// @desc Update specific User
// @route PUT /api/v1/User/:id
// @access Private

exports.updateUser = factory.updateOne(userModel);

// @desc Delete specific Clothe
// @route DELETE /api/v1/Clothe/:id
// @access Private

exports.deleteUser = factory.deleteOne(userModel);

// exports.deletecar = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const subCategory = await subCategoryModel.findOneAndDelete({ _id: id });

//     if (!subCategory) {
//         // res.status(404).json({ msg: `No subCategory for this id ${id}` });
//         return next(new ApiError(`No subCategory for this id ${id}`, 404));
//     }

//     res.status(204).json({ msg: `subCategory Deleted` });
// })
