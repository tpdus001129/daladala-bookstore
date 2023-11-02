import express from "express";
import categoryRouter from "./categoryRouter.js";

const router = express.Router();

router.use("/categories", categoryRouter);

export default router;
