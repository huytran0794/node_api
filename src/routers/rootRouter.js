import express from "express";
import userRouter from "./userRouter.js";
import foodRouter from "./foodRouter.js";
import restaurantRouter from "./restaurantRouter.js";
import fileRouter from "./fileRouter.js";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/food", foodRouter);
rootRouter.use("/restaurant", restaurantRouter);
rootRouter.use("/file", fileRouter);

export default rootRouter;
