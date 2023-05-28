const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
app.set("view engine", "ejs");

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(logger);

// Routes
const userRouter = require("./routes/users");

app.use("/users", userRouter);

// Logger
function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

// Connection
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App running in port: " + PORT);
});
