import React, { useEffect, useState, useContext } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { toast } from "react-toastify";

const DoctorDashboard = () => {
  const { dToken, backendUrl } = useContext(DoctorContext);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/doctor/dashboard`, {
          headers: {
            Authorization: `Bearer ${dToken}`,
          },
        });
        const data = await res.json();
        if (data.success) {
          setStats(data.stats);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("Dashboard fetch failed");
      }
    };

    fetchStats();
  }, [dToken]);

  if (!stats) return <p className="p-4">Loading Dashboard...</p>;

  return (
  <div className="p-4 max-w-4xl mx-auto">
    <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
      Doctor Dashboard
    </h2>

    {/* Stats Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
      <div className=" text-blue-600 shadow-md rounded-lg p-6 text-center">
        <p className="text-lg">Total Appointments</p>
        <p className="text-3xl font-bold mt-2">{stats.total}</p>
      </div>

      <div className=" text-green-600 shadow-md rounded-lg p-6 text-center">
        <p className="text-lg">Completed Appointments</p>
        <p className="text-3xl font-bold mt-2">{stats.completed}</p>
      </div>
    </div>

    {/* Upcoming Appointments */}
    <div className="bg-white shadow-md rounded-lg p-6 ">
      <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">Upcoming Appointments</h3>

      {stats.upcoming.length === 0 ? (
        <p className="text-gray-500">No upcoming appointments.</p>
      ) : (
        <ul className="space-y-3">
          {stats.upcoming.map((appt) => (
            <li
              key={appt._id}
              className="border-b pb-2 mb-2 flex justify-between items-center text-gray-700"
            >
              <div>
                <p><strong>Patient:</strong> {appt.userData?.name || "N/A"}</p>
                <p><strong>Time:</strong> {appt.slotDate}, {appt.slotTime}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

};

export default DoctorDashboard;
