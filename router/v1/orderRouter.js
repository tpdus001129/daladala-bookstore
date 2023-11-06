import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import orderController from "../../controllers/orderController.js";

const router = express.Router();

router.get("/", asyncHandler(orderController.list));

router.post("/", asyncHandler(orderController.create));

router.patch("/:orderId", asyncHandler(orderController.update));

export default router;
