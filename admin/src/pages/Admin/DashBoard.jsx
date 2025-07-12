import React from "react";
import { useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const DashBoard = () => {
  const { atoken, getDashData, cancelAppointment, dashData } =
    useContext(AdminContext);

  useEffect(() => {
    if (atoken) {
      getDashData();
    }
  }, [atoken]);

  return (
    dashData && (
      <div className="m-5">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gry-600">
                {dashData.doctors}
              </p>
              <p>Doctors</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.appointment_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gry-600">
                {dashData.appointments}
              </p>
              <p>Appointments</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all">
            <img src={assets.patients_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gry-600">
                {dashData.patients}
              </p>
              <p>Patients</p>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default DashBoard;
