import catchAsyncError from "#utils/catchAsyncError.js";

import User from "#models/user.model.js";

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
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
    confPassword: req.body.confPassword,
    gender: req.body.gender
  });
  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user: newUser
    }
  });
});
