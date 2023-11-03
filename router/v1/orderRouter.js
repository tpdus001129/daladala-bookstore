import express from "express";
import orderController from "../../controllers/orderController.js";

const router = express.Router();

router.get("/", orderController.list);

router.post("/", orderController.create);

router.patch("/:orderId", orderController.update);

export default router;
