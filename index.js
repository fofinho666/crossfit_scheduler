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

const defaultCrossfitClassCron = process.env.DEFAULT_CROSSFIT_CLASS_CRON;
const defaultCrossfitClassReservation = {
  local: process.env.DEFAULT_CROSSFIT_CLASS_LOCAL,
  hour: process.env.DEFAULT_CROSSFIT_CLASS_HOUR,
  daysInAdvance: parseInt(process.env.DEFAULT_DAYS_IN_ADVANCE_REGISTRATION)
}
agenda.define('CrossFit Class', async job => {
  const { local, hour, daysInAdvance } = job.attrs.data;
  await booking_class.automation(local, hour, daysInAdvance);
});

(async function () {
  await agenda.start();

  agenda.every(
    defaultCrossfitClassCron,
    'CrossFit Class',
    defaultCrossfitClassReservation,
    { timezone: 'Europe/Lisbon' }
  );

})();

let basicAuthUsers = {};
basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
app.use(basicAuth({ users: basicAuthUsers, challenge: true }));

app.use('/', Agendash(agenda, { title: appTitle }));

app.listen(port, () => console.log(`${appTitle} listening at http://localhost:${port}`))
