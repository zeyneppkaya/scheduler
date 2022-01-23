import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from 'components/Appointment/Form';


export default function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.student}
          interviewer={props.interview}
        />
      )}
      {mode === CREATE && <Form name={props.name} value={props.value} interviewers={props.interviewers} onCancel={back}/>}
    </Fragment>
  )
}