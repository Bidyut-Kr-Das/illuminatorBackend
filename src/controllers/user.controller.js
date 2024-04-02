import catchAsyncError from "#utils/catchAsyncError.js";

import User from "#models/user.model.js";
import AppError from "#utils/appError.js";

//cookie options
const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None"
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
  const { name, email, password, confPassword } = req.body;

  //save the user details in the database
  const newUser = await User.create({
    name,
    email,
    password,
    confPassword
  });
  //generate the access token and refresh token for the user
  const accessToken = newUser.generateAccessToken();
  const refreshToken = newUser.generateRefreshToken();

  //store the tokens in cookie and send the user details in the response
  res
    .status(201)
    .cookie(`accessToken`, accessToken, cookieOptions)
    .cookie(`refreshToken`, refreshToken, cookieOptions)
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

export const loginUser = catchAsyncError(async (req, res, next) => {
  /*
  todos
  1. take email and password from the user
  2. check if user exist
  3. checks if the password is correct or not
  4. generate access token and refresh token for the user and send it to the cookie 
  */
  // 1.
  // console.log(req.body);
  const { email, password } = req.body;

  //2.
  let user = await User.findOne({
    email
  });

  if (!user) return next(new AppError(401, `Email or Password invalid.`));

  //3.
  user = await User.findOne({
    email
  }).select(`+password`);
  const authenticated = await user.isPasswordCorrect(password);

  if (!authenticated)
    return next(new AppError(401, `Email or password invalid.`));

  // 4.
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  res
    .status(200)
    .cookie(`accessToken`, accessToken, {
      ...cookieOptions,
      maxAge:
        process.env.ACCESS_TOKEN_EXPIRE.replace(`d`, "") * 24 * 60 * 60 * 1000
    })
    .cookie(`refreshToken`, refreshToken, {
      ...cookieOptions,
      maxAge:
        process.env.REFRESH_TOKEN_EXPIRE.replace(`d`, "") * 24 * 60 * 60 * 1000
    })
    .json({
      status: "success",
      data: {
        user,
        accessToken,
        refreshToken
      }
    });
});

export const logoutUser = catchAsyncError(async (req, res, next) => {
  //from middleware verifyToken
  //extract the user id from req.user
  const { _id } = req.user;

  //update database refresh token to undefined
  await User.findByIdAndUpdate(_id, {
    refreshToken: undefined
  });

  res
    .status(200)
    .clearCookie(`accessToken`, cookieOptions)
    .clearCookie(`refreshToken`, cookieOptions)
    .send(`User logged out.`);
});
