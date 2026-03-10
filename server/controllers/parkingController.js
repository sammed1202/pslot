import Parking from "../models/Parking.js";
import fs from "fs";
import path from "path";

/* Create Parking */
export const createParking = async (req, res) => {
  try {
    const {
      parkingName,
      parkingAddress,
      totalSlots,
      ownerId,
      pricePerHour,
      vehicleType,
    } = req.body;

    const images = req.files ? req.files.map((file) => file.filename) : [];

    const newParking = new Parking({
      ownerId,
      parkingName,
      parkingAddress,
      totalSlots,
      pricePerHour,
      vehicleType,
      images,
    });

    await newParking.save();

    res.status(201).json({
      message: "Parking created successfully",
      parking: newParking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create parking",
      error: error.message,
    });
  }
};

/* Get Owner Parkings */
export const getOwnerParkings = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const parkings = await Parking.find({ ownerId });

    res.status(200).json({
      parkings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch parking",
      error: error.message,
    });
  }
};

/* Delete Parking */
export const deleteParking = async (req, res) => {
  try {
    const { id } = req.params;

    const parking = await Parking.findById(id);

    if (!parking) {
      return res.status(404).json({
        message: "Parking not found",
      });
    }

    /* delete images from folder */
    if (parking.images && parking.images.length > 0) {
      parking.images.forEach((img) => {
        const imgPath = path.join("uploads", img);

        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath);
        }
      });
    }

    await Parking.findByIdAndDelete(id);

    res.json({
      message: "Parking deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete parking",
      error: error.message,
    });
  }
};

/* Update Parking */
export const updateParking = async (req, res) => {
  try {
    const { id } = req.params;

    const parking = await Parking.findById(id);

    if (!parking) {
      return res.status(404).json({
        message: "Parking not found",
      });
    }

    let images = parking.images;

    if (req.files && req.files.length > 0) {
      /* delete old images */
      if (parking.images.length > 0) {
        parking.images.forEach((img) => {
          const oldPath = path.join("uploads", img);

          if (fs.existsSync(oldPath)) {
            fs.unlinkSync(oldPath);
          }
        });
      }

      images = req.files.map((file) => file.filename);
    }

    const updatedParking = await Parking.findByIdAndUpdate(
      id,
      {
        parkingName: req.body.parkingName,
        parkingAddress: req.body.parkingAddress,
        totalSlots: req.body.totalSlots,
        pricePerHour: req.body.pricePerHour,
        vehicleType: req.body.vehicleType,
        images,
      },
      { new: true }
    );

    res.json({
      message: "Parking updated successfully",
      parking: updatedParking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Update failed",
      error: error.message,
    });
  }
};

/* Get Single Parking */
export const getSingleParking = async (req, res) => {
  try {
    const parking = await Parking.findById(req.params.id);

    res.json({
      parking,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch parking",
    });
  }
};