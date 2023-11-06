import express from "express";
import bookController from "../../controllers/bookController.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { inputValidator, book } from "../../middleware/validator/index.js";
import { isAuthority } from "../../middleware/isAuthority.js";
import { AUTHORITY_ADMIN, AUTHORITY_SELLER } from "../../config/constants.js";

const router = express.Router();

router.get("/", asyncHandler(bookController.list));

router.post(
  "/",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN, AUTHORITY_SELLER]),
  inputValidator(book.post),
  asyncHandler(bookController.create),
);

router.get("/:bookId", asyncHandler(bookController.detail));

router.put("/:bookId", jwtAuthentication, asyncHandler(bookController.update));

router.delete(
  "/:bookId",
  jwtAuthentication,
  asyncHandler(bookController.remove),
);

export default router;
