import React from "react";
import { useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets.js";
import { toast } from "react-toastify";

const DoctorAppointment = () => {
  const { dToken, appointments, getAppointments } = useContext(DoctorContext);
  const { calculateAge } = useContext(AppContext);
  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const cancelAppointment = async (appointmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/doctor/cancel-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dToken}`,
          },
          body: JSON.stringify({ appointmentId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Appointment cancelled successfully");
        getAppointments();
      } else {
        alert("Failed to cancel appointment: " + data.message);
      }
    } catch (error) {
      console.error("Cancel error:", error);
      alert("Something went wrong while cancelling");
    }
  };

  const markCompleted = async (appointmentId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKENDURL}/api/doctor/complete-appointment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${dToken}`,
          },
          body: JSON.stringify({ appointmentId }),
        }
      );

      const data = await response.json();

      if (data.success) {
        toast.success("Appointment marked as completed");
        getAppointments();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Complete error:", error);
      toast.error("Failed to mark appointment as completed");
    }
  };

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
        {/* Header Row */}
        <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>

        {/* Appointment Rows */}
        {appointments.map((item, index) => (
          <div
            key={item._id}
            className="grid grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
          >
            <p className="max-sm:hidden">{index + 1}</p>

            {/* Patient Info */}
            <div className="flex items-center gap-2">
              <img
                src={item.userData?.image}
                className="w-8 h-8 rounded-full object-cover"
              />
              <p>{item.userData?.name || "N/A"}</p>
            </div>

            {/* Age */}
            <p className="max-sm:hidden">
              {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
            </p>

            {/* Date & Time */}
            <p>
              {item.slotDate}, {item.slotTime}
            </p>

            {/* Fees */}
            <p>{item.amount}</p>

            {/* Action Buttons */}
            <div className="flex gap-2 items-center">
              {item.isCompleted ? (
                <div className="flex items-center gap-2">
                  <img
                    src={assets.tick_icon}
                    className="w-5 h-5"
                    alt="completed"
                  />
                  <span className="text-green-600 text-sm font-medium">
                    Completed
                  </span>
                </div>
              ) : (
                <div className="flex gap-2">
                  <img
                    className="w-5 h-5 cursor-pointer"
                    src={assets.tick_icon}
                    alt="mark completed"
                    onClick={() => markCompleted(item._id)}
                  />
                  <img
                    className="w-5 h-5 cursor-pointer"
                    src={assets.cancel_icon}
                    alt="cancel"
                    onClick={() => cancelAppointment(item._id)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointment;
