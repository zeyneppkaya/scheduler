import React, { Fragment } from 'react';
import 'components/Appointment/styles.scss';
import useVisualMode from "hooks/useVisualMode";
import Header from "components/Appointment/Header";
import Show from "components/Appointment/Show";
import Empty from "components/Appointment/Empty"
import Form from 'components/Appointment/Form';
import Status from 'components/Appointment/Status';
import Confirm from "components/Appointment/Confirm";
import Error from "components/Appointment/Error";

export default function (props) {

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE"
  const ERROR_DELETE = "ERROR_DELETE"

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(err => transition(ERROR_SAVE, true));
  }

  const destroy = () => {
    if (mode === SHOW) {
      transition(CONFIRM)
    }
    else {
      transition(DELETING, true);
      props
       .cancelInterview(props.id)
       .then(() => transition(EMPTY))
       .catch(err => transition(ERROR_DELETE, true));
    }
  }

  const edit = () => {
    transition(EDIT);
  }

  const closeError = () => {
    back();
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
          onDelete={destroy}
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
          message="Are you sure you would like to delete?"
          onCancel={back}
          onConfirm={destroy} />}
      {mode === EDIT &&
        <Form
          name={props.student}
          interviewer={props.interview}
          onCancel={back}
          onSave={save}
          interviewers={props.interviewers}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message="Could not save appointment."
          onClose={closeError}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message="Could not delete appointment."
          onClose={closeError}
        />}
    </Fragment>
  )
}
