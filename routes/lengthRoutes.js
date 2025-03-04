import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  createLengthController,
  updateLengthController,
  getAllLengthsController,
  singleLengthController,
  deleteLengthController,
} from "./../controllers/lengthController.js";

const router = express.Router();

router.post(
  "/create-length",
  requireSignIn,
  isAdmin,
  createLengthController
);

router.put(
  "/update-length/:id",
  requireSignIn,
  isAdmin,
  updateLengthController
);

router.get("/get-length", getAllLengthsController);

router.get("/single-length/:slug", singleLengthController);

router.delete(
  "/delete-length/:id",
  requireSignIn,
  isAdmin,
  deleteLengthController
);

export default router;
