const router = require("express").Router()

router
    .get("/", async (req, res) => {
        res.send([
            {
                name: "Booking Class",
                puppet: "bookingClass",
                default: true,
                fields: ["local", "hour", "daysInAdvance"]
            },
            { name: "Fetch Cookie", puppet: "fetchCookie", fields: [] },
        ])
    })


module.exports = router