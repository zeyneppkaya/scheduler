import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from "components/Appointment/Confirm";

export default function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

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
      .then(() => transition(SHOW))
  }

  const remove = () => {
    if (mode === SHOW) {
      transition(CONFIRM)
    }
    else {
      transition(DELETING)
      props.cancelInterview(props.id).then(() => transition(EMPTY));
    }
  }

  const edit = () => {
    transition(EDIT);
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
          onDelete={remove}
          onEdit={edit}
        />
      )}
      {mode === CREATE &&
        <Form
          name={props.name}
          value={props.value}
          interviewers={props.interviewers}
          onCancel={back}
          onSave={save} />}
      {mode === SAVING && <Status message="Saving" />}
      {mode === DELETING &&
        <Status message="Deleting" />}
      {mode === CONFIRM &&
        <Confirm
          message="Are you sure you want to cancel this appointment"
          onCancel={back}
          onConfirm={remove} />}
      {mode === EDIT &&
        <Form
          name={props.student}
          interviewer={props.interview}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />}
    </Fragment>
  )
}
