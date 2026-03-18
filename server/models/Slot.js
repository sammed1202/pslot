import mongoose from "mongoose";

const slotSchema = new mongoose.Schema(
  {
    parkingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
    },

    slotNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["available", "occupied"],
      default: "available",
    },

    // ✅ SOFT DELETE
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },

    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Slot", slotSchema);