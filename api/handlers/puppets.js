const router = require("express").Router()

router
    .get("/", async (req, res) => {
        res.send([
            {name: "Fetch Cookie", type: "fetchCookie", fields: []},
            {
                name: "Booking Class",
                type: "bookingClass",
                default: true,
                fields: ["local", "hour", "daysInAdvance"]},
        ])
    })


module.exports = router