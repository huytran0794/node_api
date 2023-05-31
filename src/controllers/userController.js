import responseHandler from "../config/response.js";
import initModels from "../models/init-models.js";
import sequelize from "../models/index.js";
import validation from "../helpers/validation.js";

const models = initModels(sequelize);

const {
  user: User,
  restaurant: Res,
  like_res: LikeRes,
  rate_res: RateRes,
  order: Order,
  food: Food,
} = models;

const userController = {
  // like restaurant
  likeRestaurant: async (req, res) => {
    try {
      // get data from like
      const { userId, resId } = req.body;
      const user_id = Number(userId),
        res_id = Number(resId);
      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is null!!!");
      }
      if (!res_id) {
        throw new Error("Restaurant id is null!!!");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });
      console.log("user", user);
      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }
      // check if res_id exist in res table
      let restaurant = await Res.findAll({ where: { res_id } });
      if (!restaurant.length) {
        responseHandler.notFound(res, "Restaurant does not exist");
        return;
      }
      let model = {
        user_id,
        res_id,
      };
      // check if user already liked restaurant before

      let data = await LikeRes.findAll({
        where: { user_id, res_id },
      });
      if (data.length) {
        responseHandler.duplicate(res, "You already liked this restaurant");
        return;
      }

      model = { ...model, date_like: Date.now() };

      data = await LikeRes.create(model);
      if (data) {
        responseHandler.created(
          res,
          data,
          `User ${data.user_id} like ${data.res_id} successfully`
        );
      }
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // unlike restaurant
  unlikeRestaurant: async (req, res) => {
    try {
      // get data from like
      const { userId, resId } = req.body;
      const user_id = Number(userId),
        res_id = Number(resId);

      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is null!!!");
      }
      if (!res_id) {
        throw new Error("Restaurant id is null!!!");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });

      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }
      // check if res_id exist in res table
      let restaurant = await Res.findAll({ where: { res_id } });
      if (!restaurant.length) {
        responseHandler.notFound(res, "Restaurant does not exist");
        return;
      }
      let model = {
        user_id,
        res_id,
      };
      // check if user already liked restaurant before

      let data = await LikeRes.findAll({ where: model });
      if (!data.length) {
        responseHandler.duplicate(res, "You haven't liked this restaurant");
        return;
      }

      data = await LikeRes.destroy({
        where: model,
      });
      responseHandler.success(
        res,
        data,
        `User ${user_id} unlike ${res_id} successfully`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // get list of like based on user
  getLikeResList: async (req, res) => {
    try {
      // get data from like
      const { userId } = req.params;
      const user_id = Number(userId);

      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is null!!!");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });

      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }

      let data = await LikeRes.findAll({
        include: {
          association: "re",
          as: "Restaurants",
          required: true,
          attributes: ["res_id", "res_name", "image"],
        },
        where: {
          user_id,
        },
        attributes: ["user_id", "date_like"],
      });

      responseHandler.success(
        res,
        data,
        `get list of restaurant user liked successfully`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // rate restaurant
  rateRestaurant: async (req, res) => {
    try {
      // get data from like
      const { userId, resId, amount } = req.body;
      const user_id = Number(userId),
        res_id = Number(resId),
        rate_amount = Number(amount);

      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is absent");
      }

      if (!resId) {
        throw new Error("Restaurant id is absent");
      }

      if (!rate_amount) {
        throw new Error("Invalid rating amount");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });
      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }

      // check if res_id exist in res table
      let restaurant = await Res.findAll({ where: { res_id } });
      if (!restaurant.length) {
        responseHandler.notFound(res, "Restaurant does not exist");
        return;
      }

      let model = {
        user_id,
        res_id,
      };
      let rateData = { amount: rate_amount, date_rate: Date.now() };

      // check if user already rated restaurant before
      let data = await RateRes.findAll({
        where: model,
      });
      if (data.length) {
        data = await RateRes.update(rateData, { where: model });
        responseHandler.success(res, data, "Update rate amount successfully");
        return;
      }

      model = { ...model, ...rateData };

      data = await RateRes.create(model);
      if (data) {
        responseHandler.created(
          res,
          data,
          `User ${data.user_id} rate ${data.res_id} successfully`
        );
      }
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // get list of restaurant user rated
  getRateResList: async (req, res) => {
    try {
      const { userId } = req.params;
      const user_id = Number(userId);

      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is null!!!");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });

      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }

      let data = await RateRes.findAll({
        include: {
          association: "re",
          as: "Restaurants",
          required: true,
          attributes: ["res_id", "res_name", "image"],
        },
        where: {
          user_id,
        },
        attributes: ["user_id", "date_rate", "amount"],
      });

      responseHandler.success(
        res,
        data,
        `get list of rated restaurant by user successfully`
      );
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },

  // order food
  orderFood: async (req, res) => {
    try {
      // get data from like
      const { userId, foodId, amount, code, arr_sub_id } = req.body;
      const user_id = Number(userId),
        food_id = Number(foodId),
        order_amount = Number(amount);

      // check if data is sent to BE
      if (!user_id) {
        throw new Error("User id is null!!!");
      }
      if (!food_id) {
        throw new Error("Food id is null!!!");
      }

      if (!order_amount) {
        throw new Error("Invalid order amount");
      }

      // check if user_id exist in user table
      let user = await User.findAll({ where: { user_id } });
      if (!user.length) {
        responseHandler.notFound(res, "User does not exist");
        return;
      }
      // check if food_id exist in food table
      let foodList = await Food.findAll({ where: { food_id } });
      if (!foodList.length) {
        responseHandler.notFound(res, "Food does not exist");
        return;
      }
      let model = {
        user_id,
        food_id,
      };
      // check if user already order food before
      let data = await Order.findAll({
        where: model,
      });
      if (data.length) {
        responseHandler.duplicate(res, "You already order a food");
        return;
      }

      model = { ...model, amount: order_amount, arr_sub_id };

      data = await Order.create(model);
      if (data) {
        responseHandler.created(
          res,
          data,
          `User ${data.user_id} order food ${data.res_id} successfully`
        );
      }
    } catch (error) {
      console.log(error);
      responseHandler.error(res, error.message);
    }
  },
};

export default userController;
