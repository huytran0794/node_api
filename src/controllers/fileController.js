// import models
import responseHandler from "../config/response.js";

import fs from "fs";
import { FILE_DIR } from "../const/const.js";

const fileController = {
  //   update user by id
  uploadFile: async (req, res) => {
    const { file } = req;
    try {
      if (!file) {
        throw new Error(
          "No file is uploaded or corrupt file.\n Please check it"
        );
      }
      // upload image to local dir
      // responseHandler.success(res, file, "Upload ok");

      // read image file
      fs.readFile(FILE_DIR + "/" + file.filename, (err, data) => {
        if (err) {
          throw new Error("Can't read corrupted file");
        }

        let fileName = `data:${file.mimetype};base64,${Buffer.from(
          data
        ).toString("base64")}`;
        res.send(fileName);
      });
      // convert to base 64
    } catch (error) {
      // console.log(error);
      responseHandler.error(res, error.message);
    }
  },
};

export default fileController;
