// import models
import responseHandler from "../config/response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";

const models = initModels(sequelize);

const Food = models.food;

const foodController = {
  // get all food
  getAllFood: async (req, res) => {
    let data = await Food.findAll({ include: "type" });
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
      responseHandler.error(res, "Lỗi BE");
    }
  },

  getUserFoodOrder: async (req, res) => {
    try {
      // let data = await Order.findAll({
      //   include: ["food", "user"],
      // });
      let data = await Food.findAll({
        include: "user_id_user_orders",
      });
      responseHandler.success(res, data, "get user food order ok");
    } catch (error) {}
  },

  //   get food by name
  getUserByName: (req, res) => {
    res.send("get food by name");
  },

  //   create new food
  createFood: async (req, res) => {
    try {
      let { foodName, image, price, desc, type_id } = req.body;
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
