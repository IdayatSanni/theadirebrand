import express from "express";
import { isAdmin, requireSignIn } from "./../middlewares/authMiddleware.js";
import {
  getAllYardsController,
  createYardController,
  deleteYardController,
  singleYardController,
  updateYardController,
} from "./../controllers/yardController.js";

const router = express.Router();

router.post("/create-yard", requireSignIn, isAdmin, createYardController);

router.put("/update-yard/:id", requireSignIn, isAdmin, updateYardController);

router.get("/get-yard", getAllYardsController);

router.get("/single-yard/:slug", singleYardController);

router.delete("/delete-yard/:id", requireSignIn, isAdmin, deleteYardController);

export default router;
