import { Schema, model } from "mongoose";
import encryptPassword from "#middlewares/user.middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name can not be empty"],
      trim: true
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"]
    },
    email: {
      type: String,
      required: [true, "Email can not be empty"],
      trim: true,
      unique: true,
      lowercase: true
    },
    phoneNumber: {
      type: String,
      trim: true,
      minLength: [10, "Phone number must be 10 characters long"],
      maxLength: [10, "Phone number must be 10 characters long"]
    },
    password: {
      type: String,
      required: [true, "Password can not be empty"],
      select: false
    },
    confPassword: {
      type: String,
      required: [true, "Password can not be empty"],
      select: false
    },
    address: {
      type: String,
      trim: true
    },
    pin: {
      type: String,
      // required: [true, "Pin can not be empty"],
      trim: true,
      minLength: [6, "Pin must be 6 characters long"],
      maxLength: [6, "Pin must be 6 characters long"]
    },
    orders: {
      type: [Schema.Types.ObjectId],
      ref: "Product"
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

//encrypt password before saving
userSchema.pre(`save`, encryptPassword);

//compare password using bcrypt and return true or false
userSchema.methods.isPasswordCorrect = async function (password) {
  // console.log(this.password);
  return await bcrypt.compare(password, this.password);
};

//generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    }
  );
};

//generate refresh token
userSchema.methods.generateRefreshToken = async function () {
  const newRefreshToken = await jwt.sign(
    {
      id: this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    }
  );
  this.refreshToken = newRefreshToken;
  return newRefreshToken;
};

const User = model("User", userSchema);
export default User;
