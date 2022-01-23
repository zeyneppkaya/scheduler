export function getAppointmentsForDay(state, day) {

    if(!state.days){
        return [];
      }
    let selectedDay = state.days.filter(d => d.name === day)[0];
    if (!selectedDay) {
        return [];
    }
    let result = [];
    for (const id of selectedDay.appointments) {
        const appointmentObject = state.appointments[id];
        console.log(appointmentObject);
        result.push(appointmentObject);
    }
    return result;
}

export function getInterview(state, interview) {
    let interviewersObj = state.interviewers;
    let result = {};
    if(!interviewersObj || !interview){
      return null;
    }
    for(const key of Object.keys(interviewersObj)){
      let interviewer = interviewersObj[key];
      if(interviewer.id === interview.interviewer){
        result["interviewer"] = interviewer;
        result["student"] = interview.student;
      }
    }
  return result;
}

export function getInterviewersForDay(state, day){
  let result = [];
  let days = state.days;
  let interviewersStateDay;

  console.log(day)
  console.log(state)

  if(state.days.length < 1){
    return [];
  }

  for(const stateDay of days){
    if(stateDay.name === day){
      interviewersStateDay = stateDay.interviewers;
    }
  }

  if(!interviewersStateDay){
    return [];
  }

  for(const id of interviewersStateDay){
    let interviewer = state.interviewers[id];
    result.push(interviewer);
  }
  return result;
}

