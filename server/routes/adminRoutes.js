import express from "express";
import {
  getAdminStats,
  getAllUsers,
  getAllBookings,
  getAllParkings,
  deleteUser,
  deleteParking,
  deleteBooking,
} from "../controllers/adminController.js";

import {
  getDeletedUsers,
  getDeletedParkings,
  getDeletedBookings,
} from "../controllers/adminController.js";

import {
  restoreUser,
  restoreParking,
  restoreBooking,
  permanentDeleteUser,
  permanentDeleteParking,
  permanentDeleteBooking,
} from "../controllers/adminController.js";

const router = express.Router();

/* =========================
   📊 GET ROUTES
========================= */
router.get("/stats", getAdminStats);
router.get("/users", getAllUsers);
router.get("/bookings", getAllBookings);
router.get("/parkings", getAllParkings);

/* =========================
   🗑️ SOFT DELETE ROUTES
========================= */
router.delete("/users/:id", deleteUser);
router.delete("/parkings/:id", deleteParking);
router.delete("/bookings/:id", deleteBooking);

/* =========================
   🗑️ RECYCLE BIN ROUTES
========================= */
router.get("/recycle-bin/users", getDeletedUsers);
router.get("/recycle-bin/parkings", getDeletedParkings);
router.get("/recycle-bin/bookings", getDeletedBookings);

/* =========================
   ♻️ RESTORE ROUTES
========================= */
router.put("/restore/users/:id", restoreUser);
router.put("/restore/parkings/:id", restoreParking);
router.put("/restore/bookings/:id", restoreBooking);

/* =========================
   ❌ PERMANENT DELETE ROUTES
========================= */
router.delete("/permanent/users/:id", permanentDeleteUser);
router.delete("/permanent/parkings/:id", permanentDeleteParking);
router.delete("/permanent/bookings/:id", permanentDeleteBooking);

export default router;
