import express from "express";
import cookieParser from "cookie-parser";
import corsSetup from "#cors/index.js";
import userRouter from "#routes/user.routes.js";
import handleError from "#middlewares/error.middleware.js";
const app = express();

//first middleware is corsSetup
app.use(corsSetup);

app.use(express.json());

//second middleware is cookie parser
app.use(cookieParser());

app.use(`/api/v1/users`, userRouter);

app.use(handleError);

export default app;
