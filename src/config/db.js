import mysql from "mysql2";
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456",
  port: "3307",
  database: "db_food",
});

export default connection;
