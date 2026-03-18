import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema(
  {
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    parkingName: {
      type: String,
      required: true,
      trim: true,
    },

    parkingAddress: {
      type: String,
      required: true,
      trim: true,
    },

    totalSlots: {
      type: Number,
      required: true,
      min: 1,
    },

    pricePerHour: {
      type: Number,
      required: true,
      min: 0,
    },

    vehicleType: {
      type: String,
      enum: ["car", "bike", "both"],
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    // ✅ SOFT DELETE FIELDS
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

export default mongoose.model("Parking", parkingSchema);