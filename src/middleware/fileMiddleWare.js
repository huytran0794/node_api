// import multer
import multer from "multer";
import { FILE_DIR } from "../const/const.js";
// add multer for file upload
// define storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    let uniqePrefix = Date.now();
    cb(null, uniqePrefix + "-" + file.originalname);
  },
});

const multerMiddleware = multer({ storage: storage });

export default multerMiddleware;
