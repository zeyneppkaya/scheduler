# Interview Scheduler

## Project Description
Using the latest tools and techniques, we build and test a React application that allows users to book and cancel interviews. We combine a concise API with a WebSocket server to build a realtime experience.

## About Features
- Appointment days (Monday to Friday) are displayed depending on availability
- The days show the number of slots available for the day.
- Users can switch between days and find details about the interviews they can have.
- A user can book interviews by typing in a student name and clicking on an interviewer.
- A user can edit the details of an existing interview they created.
- A user can also cancel an existing interview.
- Days display currently remaining spots and capture updates after each spot changes.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```
## Student can't book an appointment without entering a name.
![home page](docs/1.png)

## Booking an appointment.
![Booking](docs/2.png)

## Saving an appointment.
![Saving Form](docs/3.png)

## Confirmation before deleting an appointment.
![Confirm](docs/4.png)

## Deleting an appointment.
![Deleting](docs/5.png)

## No spots remaining for the day.
![Fully Booked](docs/6.png)


