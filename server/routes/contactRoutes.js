import express from "express";
import {
  createContact,
  getContacts,
  deleteContact,
} from "../controllers/contactController.js";

const router = express.Router();

// Public
router.post("/", createContact);

// Admin
router.get("/", getContacts);
router.delete("/:id", deleteContact);

export default router;