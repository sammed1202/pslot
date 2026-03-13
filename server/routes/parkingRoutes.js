import express from "express";
import { createParking, deleteParking, getAllParkings, getOwnerParkings, getSingleParking, updateParking } from "../controllers/parkingController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/create", upload.array("images", 5), createParking);
router.put("/:id", upload.array("images", 5), updateParking);
router.get("/owner/:ownerId", getOwnerParkings);
router.get("/:id", getSingleParking);
router.delete("/:id", deleteParking);
router.get("/",getAllParkings);


export default router;