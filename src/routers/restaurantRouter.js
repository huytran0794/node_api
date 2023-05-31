import express from "express";
import restaurantController from "../controllers/restaurantController.js";

const restaurantRouter = express.Router();

const { getUserLikedList, getUserRatedList } = restaurantController;

restaurantRouter.get("/liked/:resId", getUserLikedList);
restaurantRouter.get("/rated/:resId", getUserRatedList);

export default restaurantRouter;
