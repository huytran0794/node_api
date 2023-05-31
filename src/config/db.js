import dotenv from "dotenv";
dotenv.config();
const { DB_HOST, DB_USER, DB_PASS, DB_PORT, DB_DATABASE, DB_DIALECT } =
  process.env;

export default {
  db_host: DB_HOST,
  db_user: DB_USER,
  db_pass: DB_PASS,
  db_port: DB_PORT,
  db_database: DB_DATABASE,
  db_dialect: DB_DIALECT,
};
