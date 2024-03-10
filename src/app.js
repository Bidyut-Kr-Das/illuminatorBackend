import express from "express";
import corsSetup from "#cors/index.js";
import userRouter from "#routes/user.routes.js";
import handleError from "#middlewares/error.middleware.js";
const app = express();

//first middleware is corsSetup
app.use(corsSetup);

app.use(express.json());

app.use(`/api/v1/users`, userRouter);

app.use(handleError);

export default app;
