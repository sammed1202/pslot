import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRouter from './routes/userRoutes.js';
import ParkingRouter from './routes/parkingRoutes.js';
import slotRoutes from "./routes/slotRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();


app.use("/api/parking", ParkingRouter);
app.use("/uploads", express.static("uploads"));
app.use("/api/users", UserRouter);
app.use("/api/slots", slotRoutes);
app.use("/api/bookings",bookingRoutes);

const PORT = process.env.PORT || 2000;
const URL = process.env.MONGOURL;

mongoose.connect(URL).then(() => {
  console.log("DB connected successfully");
  app.listen(PORT, () => {
    console.log("Server is running on Port: " + PORT);
  });
}).catch(error => console.log(error));

