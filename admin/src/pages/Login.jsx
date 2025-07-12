import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { AdminContext } from "../context/AdminContext";
import { toast } from "react-toastify";
import { DoctorContext } from "../context/DoctorContext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log("Login button clicked");

    try {
      if (state === "Admin") {
        const { data } = await axios.post(
          backendUrl + "/api/admin/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data.success) {
          localStorage.setItem("atoken", data.token);
          setAToken(data.token);
          toast.success("Admin login successful");
          navigate("/admin-dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      } else {
        const { data } = await axios.post(
          backendUrl + "/api/doctor/login",
          { email, password },
          { headers: { "Content-Type": "application/json" } }
        );

        if (data.success) {
          localStorage.setItem("dtoken", data.token);
          setDToken(data.token);
          toast.success("Doctor login successful");
          navigate("/doctor/dashboard");
        } else {
          toast.error(data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error("Login error", error);
      toast.error("Network or server error");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#55E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-blue-900">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white w-full py-2 rounded-md text-base"
        >
          Login
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-blue-900 underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-blue-900 underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
};

export default Login;
