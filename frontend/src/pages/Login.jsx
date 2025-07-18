import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/Appcontext";
import axios from 'axios'
import { toast } from "react-toastify";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const {backendUrl,token,setToken}=useContext(AppContext)
  const navigate=useNavigate()
  const [state, setState] = useState("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if(state==='signup'){
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
          
          
        }
      }else{
        const {data} = await axios.post(backendUrl+'/api/user/login',{password,email})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      
    }
  };

useEffect(()=>{
if(token){
  navigate('/')
}
},[token])


  return (
    <form onSubmit={onSubmitHandler} action="" className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-800 text-sm shadow-lg">
        <p className="text-2xl font-semibold">
          {state === "signup" ? "Create Account" : "Log in"}
        </p>
        <p>
          Please {state === "signup" ? "signup" : "log in"} to Book an
          appointment
        </p>

        {state === "signup" && (
          <div className="w-full">
            <p>Full Name</p>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
              className="border border-zinc-300 rounded w-full p-2 mt-1"
            />
          </div>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-zinc-300 rounded w-full p-2 mt-1"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded-md text-base cursor-pointer">
          {state === "signup" ? "Create Account" : "Log in"}
        </button>
        {state === "signup" ? (
          <p>
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-600 underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        ) : (
          <p>
            Create a new account{" "}
            <span
              onClick={() => setState("signup")}
              className="text-blue-600 underline cursor-pointer"
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
