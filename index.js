require('dotenv').config();
const bookingClassJob = require('./jobs/booking_class_job');
const CookieJob = require('./jobs/cookie_job');
const express = require('express');
const basicAuth = require('express-basic-auth');
const Agenda = require('agenda');
const Agendash = require('agendash');
const { MongoClient } = require("mongodb");

async function main() {
  const appTitle = "CrossFit Scheduler";

  const port = parseInt(process.env.PORT)

  const app = express();
  const client = await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true });
  const agenda = new Agenda({mongo: client.db('agenda')});

  agenda.define('Refresh Cookie', async () => {
    await CookieJob.run(client);
  });
  agenda.define('CrossFit Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(client, local, hour, daysInAdvance);
  });
  agenda.define('Weightlifting Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(client, local, hour, daysInAdvance);
  });
  agenda.define('Gymnastics Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(client, local, hour, daysInAdvance);
  });

  // Wait for agenda to connect. Should never fail since connection failures
  // should happen in the `await MongoClient.connect()` call.
  await new Promise(resolve => agenda.once('ready', resolve));

  agenda.every(
    "0 0 * * 6",
    'Refresh Cookie',
    { timezone: 'Europe/Lisbon' }
  );

  const crossfitClassReservation = {
    local: "Rato",
    hour: "18:05",
    daysInAdvance: 2
  };
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
  };
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
  };
  agenda.every(
    "00 09 * * 4",
    'Gymnastics Class',
    gymnasticsClassReservation,
    { timezone: 'Europe/Lisbon' }
  );
  agenda.start();

  let basicAuthUsers = {};
  basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
  app.use(basicAuth({ users: basicAuthUsers, challenge: true }));

  app.use('/', Agendash(agenda, { title: appTitle }));

  app.listen(port, () => console.log(`${appTitle} listening at http://localhost:${port}`))
}

main().catch(error => {
  console.error(error);
  process.exit(-1);
});
