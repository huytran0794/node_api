const express = require("express");
const userRouter = require("./userRouter");
const app = express();
const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
