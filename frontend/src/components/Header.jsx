import React from "react";
import { assets } from "../assets/assets";
import { assets1 } from "../assets/assets1";

const Header = () => {
  return (
    <div className="flex flex-col md:flex-row flex-wrap bg-blue-500 rounded-lg px-6 md:px-10 lg:px-20">
      {/* left side */}

      <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
        <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lh:-leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex flex-col md:flex-row items-center gap-3 text-white text-sm font-light">
          <img src={assets.group_profiles} alt="" className="w-28" />
          <p>
            Simply brows through our extensive list of trusted doctors,
            <br className="hidden sm:block" /> schedule your appointment
            hassle-free
          </p>
        </div>
        <a
          href="#speciality" onClick={() => scrollTo(0, 0)}
          className="flex items-center gap-2 bg-white px-8 py-3 rounded-full  text-gray-600 text-sm  m-auto md:m-0 hover:scale-105 transition-all duration-300"
        >
          Book Appointment{" "}
          <img src={assets1.arrow_icon} alt="" className="w-3" />
        </a>
      </div>

      {/* right side */}

      <div className="md:w-1/2 relative">
        <img
          src={assets1.header_img}
          alt=""
          className="w-full md:absolute bottom-0 h-auto rounded-lg"
        />
      </div>
    </div>
  );
};

export default Header;
