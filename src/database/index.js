import mongoose from "mongoose";

import { DBName } from "#src/constants.js";

const connectDB = async () => {
  const DBUrl = process.env.MONGO_URI.replace(
    `<PASSWORD>`,
    process.env.MONGO_PASS
  );
  const response = await mongoose.connect(`${DBUrl}/${DBName}`);
};
export default connectDB;
