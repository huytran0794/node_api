// chứa câu lệnh kết nối csdl bằng sequelize
import { Sequelize } from "sequelize";

// thông tin kết nối csdl
const sequelize = new Sequelize("db_food", "root", "123456", {
  host: "localhost",
  port: "3307",
  dialect: "mysql",
});

try {
  await sequelize.authenticate();
  console.log("thành công");
} catch (error) {
  console.log("thất bại");
  console.log(error);
}

export default sequelize;
