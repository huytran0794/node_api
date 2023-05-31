import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

const {
  likeRestaurant,
  unlikeRestaurant,
  getLikeResList,
  rateRestaurant,
  getRateResList,
  orderFood,
} = userController;

userRouter.get("/liked/:userId", getLikeResList);
userRouter.get("/rated/:userId", getRateResList);

userRouter.post("/like", likeRestaurant);
userRouter.post("/unlike", unlikeRestaurant);
userRouter.post("/rate-restaurant", rateRestaurant);
userRouter.post("/orderFood", orderFood);

export default userRouter;
