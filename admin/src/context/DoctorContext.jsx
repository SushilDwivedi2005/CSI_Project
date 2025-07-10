import { useState, createContext } from "react";
import  axios  from 'axios'
import {toast} from 'react-toastify' 



export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const [dToken, setDToken] = useState(
    localStorage.getItem("dtoken") ? localStorage.getItem("dtoken") : ""
  );

  const [appointments,setAppointments]=useState([])


const getAppointments = async () => {
  try {
    const { data } = await axios.get(backendUrl + '/api/doctor/appointments', {
      headers: {
        Authorization: dToken, // ✅ use standard header
      },
    });

    if (data.success) {
      setAppointments(data.appointments.reverse());
      console.log(data.appointments.reverse());
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


const cancelAppointment = async (appointmentId) => {
  try {
    const { data } = await axios.post(
      backendUrl + '/api/doctor/cancel-appointment',
      { appointmentId },
      {
        headers: {
          Authorization: dToken, // use doctor token here
        },
      }
    );

    if (data.success) {
      toast.success(data.message);
      getAppointments(); // refresh appointments after cancel
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    toast.error(error.message);
  }
};


  const backendUrl = import.meta.env.VITE_BACKENDURL;

  const value = {
    dToken,
    setDToken,
    backendUrl,appointments,setAppointments,getAppointments,cancelAppointment
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};





export default DoctorContextProvider;
