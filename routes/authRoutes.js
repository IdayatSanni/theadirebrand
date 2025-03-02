import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

import {
  registerController,
  loginController,
  testController,
  getAllOrdersController,
  getOrdersController,
  forgotPasswordController,
  updateProfileController,
  orderStatusController,
} from "../controllers/authController.js";
const router = express.Router();

router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

router.post("/forgot-password", forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected Admin route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

//protected routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfileController);

router.get("/orders", requireSignIn, getOrdersController);

router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController);

router.put(
  "/order-status/:orderId",
  requireSignIn,
  isAdmin,
  orderStatusController
);

export default router;
