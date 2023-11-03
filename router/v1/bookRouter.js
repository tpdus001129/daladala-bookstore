import express from "express";
import bookController from "../../controllers/bookController.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";
import { bookInputValidator } from "../../middleware/inputValidator/bookInputValidator.js";

const router = express.Router();

router.get("/", bookController.list);

router.post("/", jwtAuthentication, bookInputValidator, bookController.create);

router.get("/:bookId", bookController.detail);

router.put(
  "/:bookId",
  jwtAuthentication,
  bookInputValidator,
  bookController.update,
);

router.delete("/:bookId", jwtAuthentication, bookController.remove);

export default router;
