import express from "express";
import foodController from "../controllers/foodController.js";

const foodRouter = express.Router();

const { getAllFood, getFoodById, createFood, updateFood, deleteFood } =
  foodController;

foodRouter.get("/", getAllFood);
foodRouter.get("/:id", getFoodById);
foodRouter.post("/", createFood);
foodRouter.put("/:id", updateFood);
foodRouter.delete("/:id", deleteFood);

export default foodRouter;
