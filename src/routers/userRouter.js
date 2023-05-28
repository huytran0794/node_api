const express = require("express");
const userController = require("../controllers/userController");
const userRouter = express.Router();

const { getAllUser, getUserById, createUser, updateUser, deleteUser } =
  userController;

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

module.exports = userRouter;