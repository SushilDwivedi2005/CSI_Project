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

## 🛠️ Setup Instructions (Local)

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/doctor-appointment-app.git  
cd doctor-appointment-app
```

### 2. Setup Backend

```bash
cd backend  
npm install  
```

Create a `.env` file inside the `backend` folder and add:

```
PORT=5000  
MONGO_URL=your_mongodb_connection_string  
JWT_SECRET=your_jwt_secret  
```

Start the backend server:

```bash
npm start
```

### 3. Setup Frontend (User Panel)

```bash
cd ../frontend  
npm install  
```

Create a `.env` file in `frontend` folder:

```
VITE_BACKEND_URL=http://localhost:5000  
```

Start the frontend:

```bash
npm run dev  
```

Visit: [http://localhost:5173](http://localhost:5173)

### 4. Setup Admin/Doctor Panel

```bash
cd ../admin  
npm install  
```

Create a `.env` file in `admin` folder:

```
VITE_BACKEND_URL=http://localhost:5000  
```

Start the admin panel:

```bash
npm run dev  
```

Visit: [http://localhost:5174](http://localhost:5174)

