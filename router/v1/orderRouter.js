import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { isAuthority } from "../../middleware/isAuthority.js";
import { AUTHORITY_ADMIN } from "../../config/constants.js";
import orderController from "../../controllers/orderController.js";

const router = express.Router();

router.get(
  "/",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN]),
  asyncHandler(orderController.list),
);

router.get(
  "/:orderId",
  jwtAuthentication,
  asyncHandler(orderController.detail),
);

export default router;
