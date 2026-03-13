import express from "express";
import { getSlots } from "../controllers/slotController.js";

const router = express.Router();

router.get("/:parkingId", getSlots);

export default router;