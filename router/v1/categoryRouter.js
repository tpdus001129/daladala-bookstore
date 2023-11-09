import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { inputValidator, category } from "../../middleware/validator/index.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { isAuthority } from "../../middleware/isAuthority.js";
import { AUTHORITY_ADMIN } from "../../config/constants.js";
import categoryController from "../../controllers/categoryController.js";

const router = express.Router();

router.get("/", asyncHandler(categoryController.list));

router.post(
  "/",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN]),
  inputValidator(category.post),
  asyncHandler(categoryController.create),
);

router.put(
  "/:categoryId",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN]),
  inputValidator(category.put),
  asyncHandler(categoryController.update),
);

router.delete(
  "/:categoryId",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN]),
  asyncHandler(categoryController.remove),
);

export default router;
