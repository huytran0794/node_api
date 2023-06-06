import express from "express";
import "dotenv/config";
import cors from "cors";
import rootRouter from "./routers/rootRouter.js";

const app = express();

// add swagger
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    info: {
      title: "api",
      version: "1.0.0",
    },
  },
  apis: ["src/swagger/index.js"],
};

const specs = swaggerJSDoc(options);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);

// Middleware Connections
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set static file path
app.use(express.static("."));

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
