import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import AppError from "../utils/appError.js";

const uploadImage = async localFilePath => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image"
    });
    // console.log(`secure_url: ${response.secure_url}`);
    return response.secure_url;
  } catch (error) {
    throw new AppError(500, `cloudinary image upload failed: ${error.message}`);
  } finally {
    fs.unlinkSync(localFilePath);
  }
};

export default uploadImage;
