import React from "react";
import { assets } from "../assets/assets";
import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { useNavigate } from "react-router-dom";
import { DoctorContext } from "../context/DoctorContext";

const NavBar = () => {
  const { atoken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);

  const navigate = useNavigate();

  const logout = () => {
    if (atoken) {
      setAToken("");
      localStorage.removeItem("atoken");
    }
    if (dToken) {
      setDToken("");
      localStorage.removeItem("dtoken");
    }

    navigate("/");
  };

  return (
    <div className="flex  justify-between Items-center px-4 sm:px-10 py-3 border-b bg-white">
      <div className="flex items-center gap-2 text-xs">
        <img
          src={assets.admin_logo}
          alt=""
          className="w-36 sm:w-40 cursor-pointer"
        />
        <p className="border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600">
          {atoken ? "Admin" : "Doctor"}
        </p>
      </div>
      <button
        onClick={logout}
        className="bg-blue-600 text-white text-sm px-10 py-2 rounded-full"
      >
        Log out
      </button>
    </div>
  );
};

export default NavBar;
