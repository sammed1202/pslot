import mongoose from "mongoose";
import User from "../models/User.js";
import Parking from "../models/Parking.js";
import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";

// 🔴 IMPORTANT: Replace with your DB URL
const MONGO_URI = "mongodb+srv://sammedgane1008:sammedgane1008@cluster0.s2amgix.mongodb.net/pslot?appName=Cluster0";

const updateData = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // 🔥 USERS
    const usersResult = await User.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false, deletedAt: null } }
    );
    console.log("Users Updated:", usersResult.modifiedCount);

    // 🔥 PARKINGS
    const parkingsResult = await Parking.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false, deletedAt: null } }
    );
    console.log("Parkings Updated:", parkingsResult.modifiedCount);

    // 🔥 BOOKINGS
    const bookingsResult = await Booking.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false, deletedAt: null } }
    );
    console.log("Bookings Updated:", bookingsResult.modifiedCount);

    // 🔥 SLOTS (optional but recommended)
    const slotsResult = await Slot.updateMany(
      { isDeleted: { $exists: false } },
      { $set: { isDeleted: false, deletedAt: null } }
    );
    console.log("Slots Updated:", slotsResult.modifiedCount);

    console.log("🎉 Migration Completed Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Error:", error);
    process.exit(1);
  }
};

updateData();