import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);
export default router;
