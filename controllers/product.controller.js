const { uploadMixOfImages } = require("../middlewares/uploadimageMiddleware");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");
const cloudinary = require("../utils/cloudinary");
const asyncHandler = require("express-async-handler");

// 2- memoryStorage save picture in memory  as a buffer

// upload mix of images image
exports.uploadProductImage = uploadMixOfImages([
  { name: "images", maxCount: 5 },
  { name: "imageCover", maxCount: 1 },
  { name: "profileImage", maxCount: 1 },
]);



exports.resizeImage = asyncHandler(async (req, res, next) => {
  if (
    !req.files || (Object.keys(req.files).length === 0 && req.files.constructor === Object)
  ) {
    return next();
  }

  if (req.files.profileImage) {
    const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;
    const buffer = await sharp(req.files.profileImage[0].buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${buffer.toString("base64")}`,
      {
        folder: "users/profileImage",
        public_id: filename.replace(".jpeg", ""),
        format: "jpeg",
      }
    );
    req.body.profileImage = result.secure_url;
    return next();
  }

  if (req.files.imageCover) {
    const filename = `product-cover-${uuidv4()}-${Date.now()}.jpeg`;

    const buffer = await sharp(req.files.imageCover[0].buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toBuffer();

    const result = await cloudinary.uploader.upload(
      `data:image/jpeg;base64,${buffer.toString("base64")}`,
      {
        folder: "products/covers",
        public_id: filename.replace(".jpeg", ""),
        format: "jpeg",
      }
    );

    req.body.imageCover = result.secure_url;
  }

  req.body.images = [];

  await Promise.all(
    req.files.images.map(async (file) => {
      const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;

      const buffer = await sharp(file.buffer)
        .resize(600, 600)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

      const result = await cloudinary.uploader.upload(
        `data:image/jpeg;base64,${buffer.toString("base64")}`,
        {
          folder: "products/gallery",
          public_id: filename.replace(".jpeg", ""),
          format: "jpeg",
        }
      );

      req.body.images.push(result.secure_url);
    })
  );

  next();
});
