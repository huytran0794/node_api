import express from "express";
import "dotenv/config";
import cors from "cors";
import rootRouter from "./routers/rootRouter.js";

const app = express();

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);

// Routes
app.use("/api", rootRouter);

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
