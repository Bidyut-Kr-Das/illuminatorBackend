import express from "express";
import cookieParser from "cookie-parser";
import corsSetup from "#cors/index.js";
import userRouter from "#routes/user.routes.js";
import adminRouter from "#routes/admin.routes.js";
import handleError from "#middlewares/error.middleware.js";
const app = express();

app.use((req, res, next) => {
  console.log(req.headers.origin);
  console.log(process.env.CORS_ORIGIN1);
  console.log(process.env.CORS_ORIGIN2);
  next();
});
//first middleware is corsSetup
app.use(corsSetup);

app.use(express.json());

//second middleware is cookie parser
app.use(cookieParser());

//illuminator website
app.use(`/api/v1/users`, userRouter);

//illuminator Admin website
app.use(`/api/v1/admin`, adminRouter);

app.use(handleError);

export default app;
