import Slot from "../models/Slot.js";

export const getSlots = async (req, res) => {
  try {

    const slots = await Slot.find({
      parkingId: req.params.parkingId
    });

    res.json(slots);

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch slots",
      error: error.message
    });

  }
};