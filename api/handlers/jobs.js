const router = require("express").Router()
const bookingClassPuppet = require("../puppets/booking_class")
const fetchCookiePuppet = require("../puppets/fetch_cookie")
const { GetAll, GetById } = require("../finders/jobs")
const { JobValue, JobValues } = require("../values/jobs")

router
    .get("/", (req, res) => {
        GetAll()
            .then((jobs) => JobValues(jobs))
            .then((jobValues) => res.send(jobValues))

    })
    .post("/", async (req, res) => {
        const {puppet, name, interval, local, hour, daysInAdvance} = req.body
        const agenda = req.app.get("agenda")
        const options = {timezone: "Europe/Lisbon"}

        switch (puppet) {
        case "fetchCookie":
            agenda.define(name, {priority: "lowest"}, async () => {
                await fetchCookiePuppet.run()
            })

            agenda.every(interval || "one time today", name, {puppet}, options)
                .then((agenda_job) => GetById(agenda_job.attrs._id))
                .then((job) => JobValue(job))
                .then((jobValue) => res.send(jobValue))
            break
        case "bookingClass":
            agenda.define(name, async (agenda_job) => {
                const { local, hour, daysInAdvance } = agenda_job.attrs.data
                await bookingClassPuppet.run(local, hour, daysInAdvance)
            })

            agenda.every(interval || "one time today", name, { local, hour, daysInAdvance, puppet }, options)
                .then((agenda_job) => GetById(agenda_job.attrs._id))
                .then((job) => JobValue(job))
                .then((jobValue) => res.send(jobValue))
            break
        default:
            res.sendStatus(400)
        }
    })


module.exports = router