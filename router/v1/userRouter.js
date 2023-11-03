import express from "express";

import orderRouter from "./orderRouter.js";
import userController from "../../controllers/userController.js";

const router = express.Router();

router.get("/:userId", userController.detail);

router.put("/:userId", userController.update);

router.delete("/:userId", userController.remove);

router.patch("/:userId/password", userController.passwordUpdate);

router.use("/:userId/orders", orderRouter);

export default router;
