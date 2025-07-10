import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets.js'


const DoctorAppointment = () => {

const {dToken,appointments,getAppointments}= useContext(DoctorContext)
const {calculateAge} = useContext(AppContext)
useEffect(()=>{
  if(dToken){
    getAppointments()
  }
},[dToken])

  return (
    // <div className=''>
    //   <p>All Appointments</p>
    //     <div>
    //       <p>#</p>
    //       <p>Patient</p>
          
    //       <p>Age</p>
    //       <p>Date & Time</p>
    //       <p>fees</p>
    //       <p>Action</p>
    //     </div>
      
    // </div>



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
        className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-100"
      >
        <p className="max-sm:hidden">{index + 1}</p>

        {/* Patient */}
        <div className="flex items-center gap-2">
          <img
            src={item.userData?.image}
            className="w-8 h-8 rounded-full object-cover"
            alt="patient"
          />
          <p>{item.userData?.name || "N/A"}</p>
        </div>

        {/* Age */}
        <p className="max-sm:hidden">
          {item.userData?.dob ? calculateAge(item.userData.dob) : "N/A"}
        </p>

        {/* Date & Time */}
        <p>{item.slotDate}, {item.slotTime}</p>

        {/* Fees */}
        <p>{item.amount}</p>

        {/* Cancel Action */}
        <img
          className="w-6 h-6 cursor-pointer"
          src={assets.cancel_icon}
          alt="cancel"
          onClick={() => cancelAppointment(item._id)}
        />
      </div>
    ))}
  </div>
</div>


  )
}

export default DoctorAppointment