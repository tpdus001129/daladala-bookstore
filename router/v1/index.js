import express from "express";
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";
import bookRouter from "./bookRouter.js";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/books", bookRouter);
router.use("/", authRouter);

export default router;
