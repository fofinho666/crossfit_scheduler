const router = require("express").Router()
const jobsHandler = require("./handlers/jobs")
const puppetsHandler = require("./handlers/puppets")

router.use("/jobs", jobsHandler)
router.use("/puppets", puppetsHandler)
// Catch all
router.use("*", (req, res) =>{ res.status(404).json({err: "Path" + req.originalUrl  + " does not exist"}) })

module.exports = router