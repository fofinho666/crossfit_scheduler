require('dotenv').config();
const booking_class = require('./booking_class');
const express = require('express');
const basicAuth = require('express-basic-auth');
const Agenda = require('agenda');
const Agendash = require('agendash');

const app = express();
const agenda = new Agenda({ db: { address: process.env.MONGODB_URI, options: { useUnifiedTopology: true } } });

const appTitle = "CrossFit Scheduler";
const port = parseInt(process.env.PORT)

agenda.define('CrossFit Class', async job => {
  const { local, hour, daysInAdvance } = job.attrs.data;
  await booking_class.automation(local, hour, daysInAdvance);
});
agenda.define('Weightlifting Class', async job => {
  const { local, hour, daysInAdvance } = job.attrs.data;
  await booking_class.automation(local, hour, daysInAdvance);
});
agenda.define('Gymnastics Class', async job => {
  const { local, hour, daysInAdvance } = job.attrs.data;
  await booking_class.automation(local, hour, daysInAdvance);
});

(async function () {
  await agenda.start();

  const crossfitClassReservation = {
    local: "Rato",
    hour: "18:05",
    daysInAdvance: 2
  }
  agenda.every(
    "05 18 * * 0-3,6",
    'CrossFit Class',
    crossfitClassReservation,
    { timezone: 'Europe/Lisbon' }
  );

  const weightliftingClassReservation = {
    local: "Rato",
    hour: "20:15",
    daysInAdvance: 2
  }
  agenda.every(
    "15 20 * * 6",
    'Weightlifting Class',
    weightliftingClassReservation,
    { timezone: 'Europe/Lisbon' }
  );

  const gymnasticsClassReservation = {
    local: "Rato",
    hour: "09:00",
    daysInAdvance: 2
  }
  agenda.every(
    "00 09 * * 4",
    'Gymnastics Class',
    gymnasticsClassReservation,
    { timezone: 'Europe/Lisbon' }
  );

})();

let basicAuthUsers = {};
basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
app.use(basicAuth({ users: basicAuthUsers, challenge: true }));

app.use('/', Agendash(agenda, { title: appTitle }));

app.listen(port, () => console.log(`${appTitle} listening at http://localhost:${port}`))
