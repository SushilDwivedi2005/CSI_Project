// 6:48


import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import dotenv from "dotenv/config.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors());

app.use('/api/admin',adminRouter)
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.listen(process.env.PORT, () => {
  console.log(`server is running at port : ${process.env.PORT}`);
});
