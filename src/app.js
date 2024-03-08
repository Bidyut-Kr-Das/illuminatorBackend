import express from "express";
import corsSetup from "#cors/index.js";

const app = express();

app.use(corsSetup);

app.get("/", (req, res) => {
  res.json({ message: "Hello, world!" });
});

export default app;
