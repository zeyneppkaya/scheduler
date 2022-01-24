import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';


export default function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    transition(SAVING)
   
    const interview = {
      student: name,
      interviewer
    };

    props.bookInterview(props.id, interview)
    .then(()=> transition(SHOW))
  }

  return (
    <Fragment>
      <Header time={props.time}></Header>
      {mode === EMPTY && 
      <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.student}
          interviewer={props.interview}
        />
      )}
      {mode === CREATE && 
      <Form 
      name={props.name} 
      value={props.value} 
      interviewers={props.interviewers} 
      onCancel={back} 
      onSave={save}/>}
      {mode === SAVING && <Status message="Saving" />}
    </Fragment>
  )
}