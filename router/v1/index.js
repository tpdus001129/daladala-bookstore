import express from "express";
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/", authRouter);

export default router;
