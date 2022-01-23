 export default function getAppointmentsForDay(state, day) {

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

