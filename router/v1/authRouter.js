import express from "express";
import authController from "../../controllers/authController.js";
import { jwtAuthentication } from "../../middleware/jwtAuthentication.js";

const router = express.Router();

router.post("/signup", authController.signup);

router.post("/login", authController.login);

router.post("/logout", jwtAuthentication, authController.logout);

export default router;
