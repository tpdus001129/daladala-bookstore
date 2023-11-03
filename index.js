import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import path from "path";
import "dotenv/config";
import router from "./router/index.js";

const { PORT } = process.env;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerSpec = YAML.load(path.join(__dirname, "./swagger.yaml"));

const app = express();

app.use(express.json());

app.use(express.static("views"));

app.use("/api", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
