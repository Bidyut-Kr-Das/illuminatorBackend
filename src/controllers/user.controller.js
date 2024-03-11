import jwt from "jsonwebtoken";

import catchAsyncError from "#utils/catchAsyncError.js";

import User from "#models/user.model.js";

const generateAccessToken = async id => {
  return await jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

export const getUserInfo = catchAsyncError(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    message: "All users fetched successfully",
    data: {
      users: []
    }
  });
});

export const createUser = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    confPassword: req.body.confPassword,
    gender: req.body.gender
  });
  const token = await generateAccessToken(newUser._id);
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    token,
    data: {
      user: newUser
    }
  });
});
