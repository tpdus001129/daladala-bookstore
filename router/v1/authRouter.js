import express from "express";
import authController from "../../controllers/authController.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { inputValidator, user } from "../../middleware/validator/index.js";

const router = express.Router();

router.post(
  "/signup",
  inputValidator(user.signup),
  asyncHandler(authController.signup),
);

router.post(
  "/login",
  inputValidator(user.login),
  asyncHandler(authController.login),
);

router.post("/logout", jwtAuthentication, asyncHandler(authController.logout));

export default router;
