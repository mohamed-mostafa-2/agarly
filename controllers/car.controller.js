const carModel = require("../models/car.model");
const factory = require("./handlerFactory");

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

exports.getCars = factory.getAll(carModel);

// @desc Get specific car by id
// @route GET /api/v1/car/:id
// @access Public

exports.getCar = factory.getOne(carModel);

// nested route
// Post /api/v1/category/:categoryId/Car
exports.setCategoryToBody = (req, res, next) => {
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc Create Car
// @route POST /api/v1/Car
// @access Private

exports.createCar = factory.createOne(carModel);

// @desc Update specific Car
// @route PUT /api/v1/Car/:id
// @access Private

exports.updateCar = factory.updateOne(carModel);

// @desc Delete specific Car
// @route DELETE /api/v1/Car/:id
// @access Private

exports.deleteCar = factory.deleteOne(carModel);

// exports.deletecar = asyncHandler(async (req, res, next) => {
//     const id = req.params.id;
//     const subCategory = await subCategoryModel.findOneAndDelete({ _id: id });

//     if (!subCategory) {
//         // res.status(404).json({ msg: `No subCategory for this id ${id}` });
//         return next(new ApiError(`No subCategory for this id ${id}`, 404));
//     }

//     res.status(204).json({ msg: `subCategory Deleted` });
// })
