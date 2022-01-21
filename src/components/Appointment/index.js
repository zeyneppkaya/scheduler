import React, {Fragment} from 'react';
import 'components/Appointment/styles.scss';

import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"

export default function(props){

  return(
    <Fragment>
      <Header time={props.time}></Header>
      {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer} ></Show> : 

      props.id === "last" ? null:
      <Empty id={props.id}></Empty>}
    </Fragment>
  )
}