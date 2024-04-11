//package imports
import express from "express";
import cookieParser from "cookie-parser";

//local imports
import corsSetup from "#cors/index.js";
import handleError from "#middlewares/error.middleware.js";

//router imports
import userRouter from "#routes/user.routes.js";
import adminRouter from "#routes/admin.routes.js";
import productRouter from "#routes/product.routes.js";

const app = express();

//! MARK: This is debugging code for cors header setup
// app.use((req, res, next) => {
//   console.log(req.headers.origin);
//   console.log(process.env.CORS_ORIGIN1);
//   console.log(process.env.CORS_ORIGIN2);
//   next();
// });

//first middleware is corsSetup
app.use(corsSetup);

//parsing middlewares
app.use(express.urlencoded({ extended: true })); //<- for parsing formdata
app.use(express.json()); //<- for parsing json data

//second middleware is cookie parser
app.use(cookieParser());

//illuminator website
app.use(`/api/v1/users`, userRouter);

//illuminator Admin website
app.use(`/api/v1/admin`, adminRouter);

//illuminator products route
app.use(`/api/v1/products`, productRouter);

app.use(handleError);

export default app;
