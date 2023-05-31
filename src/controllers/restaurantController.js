import responseHandler from "../config/response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";

const models = initModels(sequelize);

const { restaurant: Res, like_res: LikeRes, rate_res: RateRes } = models;

const restaurantController = {
  // get list of user like this restaurant
  getUserLikedList: async (req, res) => {
    try {
      const { resId } = req.params;
      const res_id = Number(resId);

      // check if data is sent to BE
      if (!res_id) {
        throw new Error("Restaurant id is null!!!");
      }

      // check if res_id exist in user table
      let res = await Res.findAll({ where: { res_id } });

      if (!res.length) {
        responseHandler.notFound(res, "Restaurant does not exist");
        return;
      }

      let data = await LikeRes.findAll({
        include: {
          association: "user",
          as: "User",
          required: true,
          attributes: ["full_name", "email", "pass_word"],
        },
        where: {
          res_id,
        },
        attributes: ["user_id", "date_like"],
      });

      responseHandler.success(
        res,
        data,
        `get list of user like this restaurant`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // get list of user rated this restaurant
  getUserRatedList: async (req, res) => {
    try {
      const { resId } = req.params;
      const res_id = Number(resId);

      // check if data is sent to BE
      if (!res_id) {
        throw new Error("Restaurant id is null!!!");
      }

      // check if res_id exist in restaurant table
      let restaurant = await Res.findAll({ where: { res_id } });

      if (!restaurant.length) {
        responseHandler.notFound(restaurant, "Restaurant does not exist");
        return;
      }

      let data = await RateRes.findAll({
        include: {
          association: "user",
          as: "User",
          required: true,
          attributes: ["full_name", "email", "pass_word"],
        },
        where: {
          res_id,
        },
        attributes: ["user_id", "date_rate", "amount"],
      });

      responseHandler.success(
        res,
        data,
        `get list of user rate this restaurant`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },
};

export default restaurantController;
