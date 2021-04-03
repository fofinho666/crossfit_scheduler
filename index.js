require('dotenv').config();
const db = require('./db');
const bookingClassJob = require('./jobs/booking_class_job');
const CookieJob = require('./jobs/cookie_job');
const express = require('express');
const basicAuth = require('express-basic-auth');
const Agenda = require('agenda');
const Agendash = require('agendash');

async function main() {
  const appTitle = "CrossFit Scheduler";
  const port = parseInt(process.env.PORT)
  const app = express();
  const client = await db.client();
  const agenda = new Agenda({ mongo: client.db('agenda') });

  let basicAuthUsers = {};
  basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
  app.use(basicAuth({ users: basicAuthUsers, challenge: true }));

  agenda.define('Refresh Cookie', async () => {
    await CookieJob.run();
  });
  agenda.define('CrossFit Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(local, hour, daysInAdvance);
  });
  agenda.define('Weightlifting Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(local, hour, daysInAdvance);
  });
  agenda.define('Gymnastics Class', async job => {
    const { local, hour, daysInAdvance } = job.attrs.data;
    await bookingClassJob.run(local, hour, daysInAdvance);
  });

  // Wait for agenda to connect. Should never fail since connection failures
  // should happen in the `await MongoClient.connect()` call.
  await new Promise(resolve => agenda.once('ready', resolve));
  agenda.start();
  app.use('/', Agendash(agenda, { title: appTitle }));

  app.listen(port, () => console.log(`${appTitle} listening at http://localhost:${port}`));
}

main().catch(error => {
  console.error(error);
  process.exit(-1);
});
