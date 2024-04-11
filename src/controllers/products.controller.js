import catchAsyncError from "../utils/catchAsyncError.js";
import Product from "../models/product.model.js";
import AppError from "../utils/appError.js";
import uploadImage from "../services/cloudinary.js";

export const createProduct = catchAsyncError(async (req, res, next) => {
  /*
  control-flow
  1. get text input details from request.body
  2. check if any field is empty.
  3. get the product image from req.file.path
  4. upload the image to cloudinary and get the url
  5. create a new product in the database
  */

  let {
    productName,
    productDescription,
    category,
    price,
    hasDiscount,
    discount,
    tags,
    finalPrice
  } = req.body;

  hasDiscount === "on" ? (hasDiscount = true) : (hasDiscount = false);
  // console.log(req.file);

  const productFilePathLocal = req.file?.path;
  if (!productFilePathLocal)
    throw new AppError(400, `Product image is missing`);

  const productImagePathCloudinary = await uploadImage(productFilePathLocal);

  const newProduct = await Product.create({
    productName,
    productImage: productImagePathCloudinary,
    productDescription,
    category,
    price,
    hasDiscount,
    discount,
    tags,
    finalPrice
  });

  if (!newProduct)
    throw new AppError(400, `Something went wrong. Check developer mode.`);

  res.status(201).json({
    status: `success`,
    message: `Product added successfully`
  });
});
