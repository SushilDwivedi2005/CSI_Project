# 🏥 Doctor Appointment Scheduling Web App

A full-stack MERN application for booking appointments between patients and doctors. It supports secure authentication, real-time slot management, and clear role-based workflows for users and doctors.

---

## 🚀 Features

### 👤 Patient
- Register & login securely
- View list of doctors
- Book appointments with available slots
- Cancel appointments
- View upcoming bookings

### 🩺 Doctor
- Register & login securely
- Set availability slots
- View booked appointments
- Cancel appointments (if needed)

### 🔒 Security
- Role-based JWT Authentication (Patients & Doctors)
- Secure API communication using Axios
- Protected routes on both frontend and backend

### 📅 Appointment System
- Prevents double-booking
- Cancelling an appointment frees up the slot
- Slot-based dynamic availability logic

---

## 🛠️ Tech Stack

| Tech         | Description                    |
|--------------|--------------------------------|
| **MongoDB**  | Database (Mongoose ODM)        |
| **Express.js** | REST API backend framework   |
| **React.js** | Frontend with Vite             |
| **Node.js**  | Server-side runtime            |
| **JWT**      | Authentication system          |
| **Axios**    | HTTP communication             |
| **Bootstrap + Tailwind** | UI styling         |

---


