import { Schema, model } from "mongoose";
import encryptPassword from "#middlewares/user.middleware.js";

const userSchema = new Schema({
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
    required: [true, "Phone number can not be empty"],
    trim: true,
    minLength: [10, "Phone number must be 10 characters long"],
    maxLength: [10, "Phone number must be 10 characters long"],
    unique: true
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
  gender: {
    type: String,
    required: [true, "Gender must be specified"],
    trim: true,
    enum: ["Male", "Female", "Other"]
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
  }
});

userSchema.pre(`save`, encryptPassword);

const User = model("User", userSchema);
export default User;
