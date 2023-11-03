import express from "express";
import bookController from "../../controllers/bookController.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { bookInputValidator } from "../../middleware/inputValidator/bookInputValidator.js";

const router = express.Router();

router.get("/", asyncHandler(bookController.list));

router.post(
  "/",
  jwtAuthentication,
  bookInputValidator,
  asyncHandler(bookController.create),
);

router.get("/:bookId", asyncHandler(bookController.detail));

router.put(
  "/:bookId",
  jwtAuthentication,
  bookInputValidator,
  asyncHandler(bookController.update),
);

router.delete(
  "/:bookId",
  jwtAuthentication,
  asyncHandler(bookController.remove),
);

export default router;
