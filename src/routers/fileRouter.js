import express from "express";
import fileController from "../controllers/fileController.js";
import multerMiddleware from "../middleware/fileMiddleWare.js";
const fileRouter = express.Router();

const { uploadFile } = fileController;

const uploadFileHandler = (fieldName = "image") => {
  return multerMiddleware.single(fieldName);
};

fileRouter.post("/upload", multerMiddleware.single("image"), uploadFile);

export default fileRouter;
