import cron from "node-cron";
import User from "../models/User.js";
import Parking from "../models/Parking.js";
import Booking from "../models/Booking.js";

// 🔥 Runs EVERY DAY at 12:00 AM
cron.schedule("0 0  * * *", async () => {
  try {
    console.log("⏳ Running auto cleanup...");

    const days = 30;

    // 👉 Calculate cutoff date (7 days ago)
    const cutoff = new Date(Date.now() - days * 24 * 60 * 60 * 1000);

    console.log("Deleting data older than:", cutoff);

    // 🔥 DELETE USERS
    const usersDeleted = await User.deleteMany({
      isDeleted: true,
      deletedAt: { $lt: cutoff },
    });

    // 🔥 DELETE PARKINGS
    const parkingsDeleted = await Parking.deleteMany({
      isDeleted: true,
      deletedAt: { $lt: cutoff },
    });

    // 🔥 DELETE BOOKINGS
    const bookingsDeleted = await Booking.deleteMany({
      isDeleted: true,
      deletedAt: { $lt: cutoff },
    });

    console.log("🧹 Cleanup Done:");
    console.log("Users removed:", usersDeleted.deletedCount);
    console.log("Parkings removed:", parkingsDeleted.deletedCount);
    console.log("Bookings removed:", bookingsDeleted.deletedCount);

  } catch (error) {
    console.error("❌ Cron Error:", error);
  }
});