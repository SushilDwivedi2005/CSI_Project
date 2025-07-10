import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { assets1 } from "../assets/assets1";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/Appcontext";

const Navbar = () => {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);
  
  const {token,setToken,userData}=useContext(AppContext)

  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img onClick={()=>{navigate('/')}} src={assets.admin_logo} alt="" className="w-44 cursor-pointer" />
      <ul className="hidden md:flex items-start gap-5  font-medium">
        <NavLink to="/">
          <li className="py-1 ">Home</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden " />
        </NavLink>
        <NavLink to="/doctors">
          <li className="py-1 ">All Doctors</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden " />
        </NavLink>
        {/* <NavLink to="/about">
          <li className="py-1 ">About</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden " />
        </NavLink> */}
        {/* <NavLink to="contact">
          <li className="py-1 ">Contact</li>
          <hr className="border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden " />
        </NavLink> */}
      </ul>
      <div className="flex item-center gap-4">
        {token && userData  ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img
              src={userData.image}
              alt=""
              className="w-8 rounded-full"
            />
            <img src={assets1.dropdown_icon} alt="" className="w-2.5" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block ">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                <p onClick={()=>navigate("my-profile")} className="hover:text-black cursor-pointer">My profile</p>
                <p onClick={()=>navigate("my-appointments")} className="hover:text-black cursor-pointer">My appointments</p>
                <p className="hover:text-black cursor-pointer" onClick={logout}>Logout</p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white py-3 px-8 rounded-full font-light hidden md:block"
          >
            Create Account
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
