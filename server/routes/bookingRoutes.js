import express from "express";
import { getUserBookings, cancelBooking, createBooking, getOwnerBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking);

router.get("/owner/:ownerId", getOwnerBookings);


router.get("/user/:userId", getUserBookings);

router.put("/cancel/:id", cancelBooking);

export default router;