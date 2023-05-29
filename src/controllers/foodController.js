// import models
import responseHandler from "../config/response.js";
import Food from "../models/food.js";

const foodController = {
  // get all food
  getAllFood: async (req, res) => {
    let data = await Food.findAll();
    res.status(200).send(data);
  },

  //   get food by id
  getFoodById: async (req, res) => {
    try {
      // SELECT * FROM food WHERE food_id = 3
      let data = await Food.findAll({ where: { food_id: 1 } });
      responseHandler.success(res, data, "get food ok");
    } catch (error) {
      console.log(error);
      // res.status(500).send("Lỗi BE", error);
      responseHandler.error(res, "Lỗi BE");
    }
  },

  //   get food by name
  getUserByName: (req, res) => {
    res.send("get food by name");
  },

  //   create new food
  createFood: async (req, res) => {
    try {
      let { foodName, image, price, desc, type_id } = req.body;
      console.log("body");
      console.log({ foodName, image, price, desc, type_id });
      let model = { foodName, image, price, desc, type_id };

      let newFoodId = await Food.create({ ...model });
      responseHandler.success(
        res,
        newFoodId,
        `Food ${newFoodId} is created successfully`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, "Lỗi BE");
    }
  },

  //   update user by id
  updateFood: async (req, res) => {
    try {
      let { food_id } = req.params;
      let { food_name, image, price, desc, type_id } = req.body;
      let model = { food_name, image, price, desc, type_id };
      await Food.update(model, {
        where: { food_id: food_id },
      });
    } catch (error) {
      console.log(error);
      responseHandler.error(res, "Lỗi BE");
    }
  },
  //   delete user by name
  deleteFood: (req, res) => {
    // check if user exists before deleting
    res.send("delete food by id");
  },
};

export default foodController;
