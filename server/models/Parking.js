import mongoose from "mongoose";

const parkingSchema = new mongoose.Schema({

  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  parkingName: {
    type: String,
    required: true
  },

  parkingAddress: {
    type: String,
    required: true
  },

  totalSlots: {
    type: Number,
    required: true
  },
  pricePerHour: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ["car", "bike", "both"],
    required: true
  },
  images: [{
    type: String
  }]

}, { timestamps: true });

export default mongoose.model("Parking", parkingSchema);