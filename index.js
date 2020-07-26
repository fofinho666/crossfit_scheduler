require('dotenv').config();
const booking_class = require('./booking_class');
const express = require('express');
const Agenda = require('agenda');
const Agendash = require('agendash');

const app = express();
const agenda = new Agenda({db: {address: process.env.MONGO_URL}});

const appTitle = "CrossFit Scheduler";
const port = parseInt(process.env.PORT)

const defaultCrossfitClassCron = process.env.DEFAULT_CROSSFIT_CLASS_CRON;
const defaultCrossfitClassReservation = {
  local: process.env.DEFAULT_CROSSFIT_CLASS_LOCAL,
  hour: process.env.DEFAULT_CROSSFIT_CLASS_HOUR,
  days_in_advance: parseInt(process.env.DEFAULT_DAYS_IN_ADVANCE_REGISTRATION)
}
agenda.define('CrossFit Class', async job => {
	const {local, hour, days_in_advance} = job.attrs.data;
  await booking_class.automation(local, hour, days_in_advance);
});

(async function() {
  await agenda.start();
  agenda.every(defaultCrossfitClassCron, 'CrossFit Class', defaultCrossfitClassReservation);
})();

app.use('/', Agendash(agenda, {title: appTitle}));

app.listen(port, () => console.log(`${appTitle} listening at http://localhost:${port}`))
