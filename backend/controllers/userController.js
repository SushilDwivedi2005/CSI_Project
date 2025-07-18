import validator from "validator";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Enter a strong password (min 8 chars)",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new userModel({ name, email, password: hashedPassword });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({ success: true, message: "User registered", token });
  } catch (error) {
    console.error("Register Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log("Login error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.userId;

    const userData = await userModel.findById(userId).select("-password");

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, userData });
  } catch (error) {
    console.error("Profile Error:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { name, phone, address, dob, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !dob || !gender) {
      return res.json({ success: false, message: "Data Missing" });
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });

    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      const imageUrl = imageUpload.secure_url;

      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }

    res.json({ success: true, message: "profile Updated" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Book Appointment

const bookAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { docId, slotDate, slotTime } = req.body;

    const doc = await doctorModel.findById(docId).select("+slots_booked");
    if (!doc) return res.json({ success: false, message: "Doctor not found" });
    if (!doc.available)
      return res.json({ success: false, message: "Doctor not available" });

    const slots_booked = doc.slots_booked || {};

    if (slots_booked[slotDate] && slots_booked[slotDate].includes(slotTime)) {
      return res.json({ success: false, message: "Slot not available" });
    }

    const existingAppointment = await appointmentModel.findOne({
      docId,
      slotDate,
      slotTime,
    });

    if (existingAppointment) {
      return res.json({
        success: false,
        message: "This time slot is already booked",
      });
    }

    if (!slots_booked[slotDate]) slots_booked[slotDate] = [];
    slots_booked[slotDate].push(slotTime);

    const userData = await userModel.findById(userId).select("-password");

    const { slots_booked: _, ...cleanedDocData } = doc._doc;

    const newAppointment = new appointmentModel({
      userId,
      docId,
      userData,
      docData: cleanedDocData,
      amount: doc.fees,
      slotDate,
      slotTime,
      date: Date.now(),
    });

    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    return res.json({ success: true, message: "Appointment Booked" });
  } catch (error) {
    console.error("Booking Error:", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const listAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const appointments = await appointmentModel.find({ userId });

    res.json({ success: true, appointments });
  } catch (error) {
    console.log("List Error:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

const cancelAppointment = async (req, res) => {
  try {
    const userId = req.userId;
    const { appointmentId } = req.body;

    const appointmentData = await appointmentModel.findById(appointmentId);

    if (!appointmentData) {
      return res.json({ success: false, message: "Appointment not found" });
    }

    // Verify ownership
    if (appointmentData.userId.toString() !== userId) {
      return res.json({ success: false, message: "Unauthorized" });
    }

    const { docId, slotDate, slotTime } = appointmentData;

    // Remove the slot from doctor's record
    const doctorData = await doctorModel.findById(docId);
    if (
      doctorData?.slots_booked?.[slotDate] &&
      doctorData.slots_booked[slotDate].includes(slotTime)
    ) {
      doctorData.slots_booked[slotDate] = doctorData.slots_booked[
        slotDate
      ].filter((time) => time !== slotTime);

      if (doctorData.slots_booked[slotDate].length === 0) {
        delete doctorData.slots_booked[slotDate];
      }

      await doctorModel.findByIdAndUpdate(docId, {
        slots_booked: doctorData.slots_booked,
      });
    }

    // Finally delete the appointment
    await appointmentModel.findByIdAndDelete(appointmentId);

    res.json({ success: true, message: "Appointment Cancelled & Deleted" });
  } catch (error) {
    console.log("Cancel Error:", error.message);
    res.json({ success: false, message: "Server Error" });
  }
};

export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  listAppointment,
  cancelAppointment,
};
