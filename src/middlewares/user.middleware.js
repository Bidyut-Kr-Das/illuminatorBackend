import bcrypt from "bcryptjs";

//utili funciton imports
import AppError from "#utils/appError.js";

export default async function encryptPassword(next) {
  if (this.password !== this.confPassword) {
    return next(
      new AppError(400, `Password and confirm password does not match.`)
    );
  }
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  this.confPassword = undefined;
}
