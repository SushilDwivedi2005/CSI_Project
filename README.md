🏥 Doctor Appointment Scheduling Web App

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
📽️ Project Demo (YouTube)
Watch the full walkthrough and explanation of the Doctor Appointment Management System built during my Celebal Summer Internship in the Node.js domain.

[![Watch the video](https://img.youtube.com/vi/e_tThrednJQ/0.jpg)](https://youtu.be/e_tThrednJQ)



## 🖼️ Screenshots

### 🏠 Home Page
<img width="1366" height="603" alt="Screenshot (82)" src="https://github.com/user-attachments/assets/d7fa5f8a-d27e-450e-875d-703bd59b17e6" />


### 👨‍⚕️ Doctors List
<img width="1366" height="605" alt="Screenshot (83)" src="https://github.com/user-attachments/assets/99217e31-f942-4087-b1aa-94a885b79341" />


### 📅 My Appointments (User Panel)
<img width="1366" height="610" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/a76cac92-7062-40b5-933f-0bfc22c6a47d" />


### 🩺 Doctor Panel
<img width="1366" height="600" alt="Screenshot (86)" src="https://github.com/user-attachments/assets/744d3036-43fd-4889-8fee-907e1ea0b098" />


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
CLOUDINARY_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET_KEY=your_cloudinary_secret
ADMIN_EMAIL=your_admin_email
ADMIN_PASSWORD=your_admin_password 
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

