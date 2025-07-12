import React from "react";
import Login from "./pages/Login.jsx";
import { ToastContainer, toast } from "react-toastify";
import { useContext } from "react";
import { AdminContext } from "./context/AdminContext.jsx";
import NavBar from "./components/NavBar.jsx";
import SideBar from "./components/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/Admin/DashBoard.jsx";
import AllAppointments from "./pages/Admin/AllAppointments.jsx";
import AddDoctor from "./pages/Admin/AddDoctor.jsx";
import DoctorsList from "./pages/Admin/DoctorsList.jsx";
import { DoctorContext } from "./context/DoctorContext.jsx";
import DoctorProfile from "./pages/Doctor/doctorProfile.jsx";
import DoctorAppointment from "./pages/Doctor/DoctorAppointment.jsx";
import DoctorDashboard from "./pages/Doctor/DoctorDashboard.jsx";

const App = () => {
  const { atoken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);

  return atoken || dToken ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <NavBar />
      <div className="flex items-start">
        <SideBar />
        <Routes>
          {/* admin Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/admin-dashboard" element={<DashBoard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />
          <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

          {/* doctor Routes */}
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );

  if (!atoken && !dToken) {
    return (
      <>
        <Login />
        <ToastContainer />
      </>
    );
  }
};

export default App;
