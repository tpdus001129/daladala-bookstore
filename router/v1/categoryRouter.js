import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import categoryController from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/", asyncHandler(categoryController.list));

export default router;
