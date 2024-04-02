import catchAsyncError from "#utils/catchAsyncError.js";
import User from "#models/user.model.js";
import AppError from "#utils/appError.js";
import jwt from "jsonwebtoken";

const cookieOptions = {
  httpOnly: true,
  secure: true,
  sameSite: "None"
};

const generateAdminToken = id => {
  return jwt.sign(
    {
      id
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ADMIN_ACCESS_TOKEN_EXPIRE
    }
  );
};

export const adminLogin = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select(`+password`);

  if (!user) return next(new AppError(401, `Email or password is invalid!`));

  if (!user.isPasswordCorrect(password))
    return next(new AppError(401, `Email or password is invalid!`));

  if (user.role !== `admin`)
    return next(new AppError(401, `Unauthorized access!`));

  const adminAccessToken = generateAdminToken(user._id);
  const refreshToken = await user.generateRefreshToken();

  res
    .status(200)
    .cookie(`accessToken`, adminAccessToken, {
      ...cookieOptions,
      maxAge:
        process.env.ADMIN_ACCESS_TOKEN_EXPIRE.replace(`d`, ``) *
        24 *
        60 *
        60 *
        1000
    })
    .cookie(`refreshToken`, refreshToken, {
      ...cookieOptions,
      maxAge:
        process.env.REFRESH_TOKEN_EXPIRE.replace(`d`, ``) * 24 * 60 * 60 * 1000
    })
    .json({
      status: `success`,
      data: {
        accessToken: adminAccessToken,
        refreshToken
      }
    });
});
