import jwt from "jsonwebtoken";

import catchAsyncError from "#utils/catchAsyncError.js";
import AppError from "#utils/appError.js";
import User from "#models/user.model.js";

export const verifyAccessToken = catchAsyncError(async (req, _, next) => {
  const token =
    req.cookies.accessToken ||
    req.header(`Authorization`).replace(`Bearer `, "");
  //if no token is present
  // console.log(token);
  if (!token) throw new AppError(401, `Unauthorized request`);

  let decodedToken = "";
  if (req.headers.role === `admin`)
    decodedToken = jwt.verify(token, process.env.ADMIN_ACCESS_TOKEN_SECRET);
  else decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decodedToken.id).select(
    `-password -__v -refreshToken -role`
  );
  req.user = user;
  next();
});
