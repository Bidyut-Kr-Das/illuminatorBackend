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
  //take request fields
  const { name, email, phoneNumber, gender, password, confPassword } = req.body;

  //save the user details in the database
  const newUser = await User.create({
    name,
    email,
    phoneNumber,
    gender,
    password,
    confPassword
  });
  //generate the access token and refresh token for the user
  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  //cookie options
  const options = {
    httpOnly: true,
    secure: true
  };

  //store the tokens in cookie and send the user details in the response
  res
    .status(201)
    .cookie(`accessToken`, accessToken, options)
    .cookie(`refreshToken`, refreshToken, options)
    .json({
      status: "success",
      message: "User created successfully",
      data: {
        user: newUser,
        accessToken,
        refreshToken
      }
    });
});
