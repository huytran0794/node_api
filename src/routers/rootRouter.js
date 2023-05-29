import express from "express";
import userRouter from "./userRouter.js";
import foodRouter from "./foodRouter.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/food", foodRouter);

export default rootRouter;
