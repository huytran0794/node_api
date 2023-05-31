// chứa câu lệnh kết nối csdl bằng sequelize
import { Sequelize } from "sequelize";
import config from "../config/db.js";
// thông tin kết nối csdl
const { db_user, db_pass, db_database, db_host, db_port, db_dialect } = config;
const sequelize = new Sequelize(db_database, db_user, db_pass, {
  host: db_host,
  port: db_port,
  dialect: db_dialect,
});

try {
  await sequelize.authenticate();
  console.log("thành công");
} catch (error) {
  console.log("thất bại");
  console.log(error);
}

export default sequelize;
