import express from "express";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import userController from "../../controllers/userController.js";
import orderController from "../../controllers/orderController.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { isMySelf } from "../../middleware/isMySelf.js";
import {
  inputValidator,
  user,
  order,
} from "../../middleware/validator/index.js";

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


router.get(
  "/:userId/orders",
  jwtAuthentication,
  // TODO: 관리자, 판매자, 구매자만 요청가능하게 관련 미들웨어 추가
  asyncHandler(orderController.list),
);

router.post(
  "/:userId/orders",
  jwtAuthentication,
  isMySelf,
  inputValidator(order.post),
  asyncHandler(orderController.create),
);

router.patch(
  "/:userId/orders/:orderId",
  jwtAuthentication,
  // TODO: 관리자, 판매자, 구매자만 요청가능하게 관련 미들웨어 추가
  asyncHandler(orderController.update),
);

export default router;
