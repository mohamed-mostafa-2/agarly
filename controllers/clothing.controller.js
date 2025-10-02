const clothingModel = require("../models/clothes.model");
const asyncHandler = require("express-async-handler");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadimageMiddleware");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

// upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

// image processing
exports.resizeImage = asyncHandler((req, res, next) => {
  // if we refactor we make multi arguments for this we don't refactoring this
  const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;
  sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`uploads/products/clothes/${filename}`);
  req.body.image = filename;
  next();
});

// nested route
// Get /api/v1/category/:categoryId/subCategory

// @desc get list of all car
// @route GET /api/v1/car
// @access Public

exports.createFilterObj = (req, res, next) => {
  let filterObj = {};
  if (req.params.categoryId) filterObj = { category: req.params.categoryId };
  req.filterObj = filterObj;
  next();
};

exports.getClothes = factory.getAll(clothingModel);

// @desc Get specific car by id
// @route GET /api/v1/car/:id
// @access Public

exports.getClothe = factory.getOne(clothingModel);

// nested route
// Post /api/v1/category/:categoryId/Clothe
exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc Create Clothe
// @route POST /api/v1/Clothe
// @access Private

exports.createClothe = factory.createOne(clothingModel);

// @desc Update specific Clothe
// @route PUT /api/v1/Clothe/:id
// @access Private

exports.updateClothe = factory.updateOne(clothingModel);

// @desc Delete specific Clothe
// @route DELETE /api/v1/Clothe/:id
// @access Private

exports.deleteClothe = factory.deleteOne(clothingModel);

// exports.deletecar = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const subCategory = await subCategoryModel.findOneAndDelete({ _id: id });

//     if (!subCategory) {
//         // res.status(404).json({ msg: `No subCategory for this id ${id}` });
//         return next(new ApiError(`No subCategory for this id ${id}`, 404));
//     }

//     res.status(204).json({ msg: `subCategory Deleted` });
// })
