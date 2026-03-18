import User from "../models/User.js";
import Parking from "../models/Parking.js";
import Booking from "../models/Booking.js";

/* =========================
   📊 ADMIN STATS
========================= */
export const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: "user",
      isDeleted: false,
    });

    const totalOwners = await User.countDocuments({
      role: "owner",
      isDeleted: false,
    });

    const totalParkings = await Parking.countDocuments({
      isDeleted: false,
    });

    const totalBookings = await Booking.countDocuments({
      isDeleted: false,
    });

    res.json({
      totalUsers,
      totalOwners,
      totalParkings,
      totalBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch stats",
      error: error.message,
    });
  }
};

/* =========================
   👤 USERS
========================= */
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: false });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   📅 BOOKINGS
========================= */
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: false })
      .populate({
        path: "parkingId",
        match: { isDeleted: false },
      })
      .populate({
        path: "userId",
        match: { isDeleted: false },
      });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🅿️ PARKINGS
========================= */
export const getAllParkings = async (req, res) => {
  try {
    const parkings = await Parking.find({ isDeleted: false });
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ SOFT DELETE USER
========================= */
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User moved to recycle bin", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ SOFT DELETE PARKING
========================= */
export const deleteParking = async (req, res) => {
  try {
    const { id } = req.params;

    const parking = await Parking.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }

    res.json({ message: "Parking moved to recycle bin", parking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ SOFT DELETE BOOKING
========================= */
export const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json({ message: "Booking moved to recycle bin", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ RECYCLE BIN - USERS
========================= */
export const getDeletedUsers = async (req, res) => {
  try {
    const users = await User.find({ isDeleted: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ RECYCLE BIN - PARKINGS
========================= */
export const getDeletedParkings = async (req, res) => {
  try {
    const parkings = await Parking.find({ isDeleted: true });
    res.json(parkings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   🗑️ RECYCLE BIN - BOOKINGS
========================= */
export const getDeletedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: true })
      .populate("userId")
      .populate("parkingId");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ♻️ RESTORE USER
========================= */
export const restoreUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "User restored", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ♻️ RESTORE PARKING
========================= */
export const restoreParking = async (req, res) => {
  try {
    const { id } = req.params;

    const parking = await Parking.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!parking) return res.status(404).json({ message: "Parking not found" });

    res.json({ message: "Parking restored", parking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ♻️ RESTORE BOOKING
========================= */
export const restoreBooking = async (req, res) => {
  try {
    const { id } = req.params;

    const booking = await Booking.findByIdAndUpdate(
      id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking restored", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

{/* permanent delete routes */}
/* =========================
   ❌ PERMANENT DELETE USER
========================= */
export const permanentDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.findByIdAndDelete(id);

    res.json({ message: "User permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ❌ PERMANENT DELETE PARKING
========================= */
export const permanentDeleteParking = async (req, res) => {
  try {
    const { id } = req.params;

    await Parking.findByIdAndDelete(id);

    res.json({ message: "Parking permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* =========================
   ❌ PERMANENT DELETE BOOKING
========================= */
export const permanentDeleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    await Booking.findByIdAndDelete(id);

    res.json({ message: "Booking permanently deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};