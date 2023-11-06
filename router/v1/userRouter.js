import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import orderRouter from "./orderRouter.js";
import userController from "../../controllers/userController.js";

const router = express.Router();

router.get("/:userId", asyncHandler(userController.detail));

router.put("/:userId", asyncHandler(userController.update));

router.delete("/:userId", asyncHandler(userController.remove));

router.patch("/:userId/password", asyncHandler(userController.passwordUpdate));

router.use("/:userId/orders", orderRouter);

export default router;
