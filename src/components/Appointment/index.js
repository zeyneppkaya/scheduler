import React from 'react';
import 'components/Appointment/styles.scss';
// import Appointment from "components/Appointment";

export default function Appointment(props) {

    const displayAppointment = function(time){
        if(!time) {
          return 'No Appointments';
        }
        else{
          return `Appointment at ${time}`;
        }
      } 

    return (
        <article className="appointment">{displayAppointment(props.time)}</article>
  )
}