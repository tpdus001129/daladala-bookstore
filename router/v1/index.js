import express from "express";
import categoryRouter from "./categoryRouter.js";
import bookRouter from "./bookRouter.js";

const router = express.Router();

router.use("/categories", categoryRouter);
router.use("/books", bookRouter);

export default router;
