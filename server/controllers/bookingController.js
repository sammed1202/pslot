import Booking from "../models/Booking.js";
import Slot from "../models/Slot.js";
import Parking from "../models/Parking.js";

export const createBooking = async (req, res) => {

  try {

    const { userId, parkingId, slotNumber } = req.body;

    if (!userId || !parkingId || !slotNumber) {
      return res.status(400).json({
        message: "Missing booking information"
      });
    }

    const slot = await Slot.findOne({
      parkingId,
      slotNumber
    });

    if (!slot) {
      return res.status(404).json({
        message: "Slot not found"
      });
    }

    if (slot.status === "occupied") {
      return res.status(400).json({
        message: "Slot already booked"
      });
    }

    const booking = new Booking({
      userId,
      parkingId,
      slotNumber
    });

    await booking.save();

    slot.status = "occupied";
    await slot.save();

    res.json({
      message: "Parking booked successfully"
    });

  } catch (error) {

    console.error("BOOKING ERROR:", error);

    res.status(500).json({
      message: "Internal server error",
      error: error.message
    });

  }

};

export const getUserBookings = async (req, res) => {

  try {

    const { userId } = req.params;

    const bookings = await Booking.find({ userId })
      .populate("parkingId");

    res.json({
      bookings
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch bookings",
      error: error.message
    });

  }

};


{/* cancelBooking controller */}
export const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found"
      });
    }

    booking.status = "cancelled";

    await booking.save();

    res.json({
      message: "Booking cancelled successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: "Cancel failed",
      error: error.message
    });

  }

};

export const getOwnerBookings = async (req, res) => {

  try {

    const { ownerId } = req.params;

    // find all parkings created by owner
    const parkings = await Parking.find({ ownerId });

    const parkingIds = parkings.map(p => p._id);

    // find bookings for those parkings
    const bookings = await Booking.find({
      parkingId: { $in: parkingIds }
    })
      .populate("parkingId", "parkingName")
      .populate("userId", "name email");

    res.json({
      bookings
    });

  } catch (error) {

    console.error("Owner booking error:", error);

    res.status(500).json({
      message: "Failed to fetch owner bookings",
      error: error.message
    });

  }

};