import express from "express";
import categoryRouter from "./categoryRouter.js";
import authRouter from "./authRouter.js";
import bookRouter from "./bookRouter.js";
import orderRouter from "./orderRouter.js";
import userRouter from "./userRouter.js";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/books", bookRouter);
router.use("/orders", orderRouter);
router.use("/users", userRouter);
router.use("/", authRouter);

export default router;
