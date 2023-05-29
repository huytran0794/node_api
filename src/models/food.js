// thuộc tính, kiểu dữ liệu
// DAO cho đối tượng food

import { DataTypes, Model } from "sequelize";
import sequelize from "./index.js";
class Food extends Model {}

// tham số 1: định nghĩa các thuộc tính map với column ở trong table
// tham số 2: kết nối dao với table
Food.init(
  {
    food_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    foodName: {
      type: DataTypes.STRING,
      field: "food_name",
    },
    image: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    desc: {
      type: DataTypes.STRING,
    },
    type_id: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "Food", tableName: "food", timestamps: false }
);

export default Food;
