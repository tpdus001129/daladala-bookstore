import express from "express";
import bookController from "../../controllers/bookController.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { inputValidator, book } from "../../middleware/validator/index.js";
import { isAuthority } from "../../middleware/isAuthority.js";
import { AUTHORITY_ADMIN, AUTHORITY_SELLER } from "../../config/constants.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/books/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const router = express.Router();

router.get("/", asyncHandler(bookController.list));

router.post(
  "/",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN, AUTHORITY_SELLER]),
  upload.single('image'),
  inputValidator(book.post),
  asyncHandler(bookController.create),
);

router.get("/:bookId", asyncHandler(bookController.detail));

router.put(
  "/:bookId",
  jwtAuthentication,
  isAuthority([AUTHORITY_ADMIN, AUTHORITY_SELLER]),
  upload.single("image"),
  inputValidator(book.put),
  asyncHandler(bookController.update),
);

router.delete(
  "/:bookId",
  jwtAuthentication,
  asyncHandler(bookController.remove),
);

export default router;
