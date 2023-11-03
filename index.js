import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
import mongoose from "mongoose";
import router from "./router/index.js";
import cookieParser from "cookie-parser";

const { PORT, MONGODB_URI } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

const app = express();

mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to MongoDB");
});

app.use(express.json());
app.use(cookieParser());

app.use(express.static("views"));

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(function (err, req, res, next) {
  res.status(500).json({ message: err.message });
  next();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
