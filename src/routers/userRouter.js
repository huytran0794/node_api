import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

const { getAllUser, getUserById, createUser, updateUser, deleteUser } =
  userController;

userRouter.get("/", getAllUser);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export default userRouter;
