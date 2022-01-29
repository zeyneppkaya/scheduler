import React, { useState, useEffect } from 'react';
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import Appointment from 'components/Appointment';
import axios from 'axios';

export default function useApplicationData() {

    const [state, setState] = useState({
        day: "Monday",
        days: [],
        appointments: {},
        interviewers: {}
    });

    function searchDay(day) {
        const daysInWeek = {
            Monday: 0,
            Tuesday: 1,
            Wednesday: 2,
            Thursday: 3,
            Friday: 4
        }
        return daysInWeek[day]
    }

    const bookInterview = (id, interview) => {

        const appointment = {
            ...state.appointments[id],
            interview: { ...interview }
        };
        const appointments = {
            ...state.appointments,
            [id]: appointment
        };

        const dayInWeek = searchDay(state.day)

        let day = {
            ...state.days[dayInWeek],
            spots: state.days[dayInWeek]
        }

        if (!state.appointments[id].interview) {
            day = {
                ...state.days[dayInWeek],
                spots: state.days[dayInWeek].spots - 1
            }
        } else {
            day = {
                ...state.days[dayInWeek],
                spots: state.days[dayInWeek].spots
            }
        }

        let days = state.days
        days[dayInWeek] = day;

        return axios.put(`/api/appointments/${id}`, { interview })
            .then(res => {
                console.log(res);
                setState(
                    { ...state, appointments, days }
                );
            });
    }

    const cancelInterview = (id) => {
        const appointment = {
            ...state.appointments[id],
            interview: null
        }
        const appointments = {
            ...state.appointments,
            [id]: appointment
        }

        const dayInWeek = searchDay(state.day)

        const day = {
            ...state.days[dayInWeek],
            spots: state.days[dayInWeek].spots + 1
        }

        let days = state.days
        days[dayInWeek] = day;

        return axios.delete(`/api/appointments/${id}`)
            .then(res => {
                console.log(res);
                setState(
                    { ...state, appointments, days }
                );
            });
    }

    const setDay = day => setState({ ...state, day });
    let interviewers = getInterviewersForDay(state, state.day)

    const appointments = getAppointmentsForDay(state, state.day);
    const schedule = appointments.map(appointment => {
        let interview = getInterview(state, appointment.interview);

        console.log(interview)
        if (interview) {
            return (
                <Appointment
                    key={appointment.id}
                    id={appointment.id}
                    time={appointment.time}
                    interview={interview.interviewer}
                    interviewer={interview.interviewer.id}
                    student={interview.student}
                    interviewers={interviewers}
                    bookInterview={bookInterview}
                    cancelInterview={cancelInterview}
                />
            );
        }

        else {
            return (
                <Appointment
                    key={appointment.id}
                    id={appointment.id}
                    time={appointment.time}
                    interview={null}
                    interviewers={interviewers}
                    bookInterview={bookInterview}
                />
            );
        }
    });

    useEffect(() => {
        Promise.all([
            Promise.resolve(axios.get('http://localhost:8001/api/days')),
            Promise.resolve(axios.get('http://localhost:8001/api/appointments')),
            Promise.resolve(axios.get('http://localhost:8001/api/interviewers'))
        ]).then((all) => {
            setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
        })
    }, [])

    return {
        state,
        setDay,
        bookInterview,
        cancelInterview,
        schedule
    }
}    