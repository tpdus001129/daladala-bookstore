import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import orderRouter from "./orderRouter.js";
import userController from "../../controllers/userController.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { isMySelf } from "../../middleware/isMySelf.js";
import { inputValidator, user } from "../../middleware/validator/index.js";

const router = express.Router();

router.get(
  "/:userId",
  jwtAuthentication,
  isMySelf,
  asyncHandler(userController.detail),
);

router.put(
  "/:userId",
  jwtAuthentication,
  isMySelf,
  inputValidator(user.put),
  asyncHandler(userController.update),
);

router.delete(
  "/:userId",
  jwtAuthentication,
  isMySelf,
  inputValidator(user.remove),
  asyncHandler(userController.remove),
);

router.patch(
  "/:userId/password",
  jwtAuthentication,
  isMySelf,
  inputValidator(user.passwordUpdate),
  asyncHandler(userController.passwordUpdate),
);

router.use("/:userId/orders", orderRouter);

export default router;
