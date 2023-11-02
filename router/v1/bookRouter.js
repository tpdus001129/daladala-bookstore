import express from "express";
import bookController from "../../controllers/bookController.js";

const router = express.Router();

router.get("/", bookController.list);

router.post("/", bookController.create);

router.get("/:bookId", bookController.detail);

router.put("/:bookId", bookController.update);

router.delete("/:bookId", bookController.remove);

export default router;
