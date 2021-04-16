const createError = require("http-errors")
const express = require("express")
const basicAuth = require("express-basic-auth")
const logger = require("morgan")
const MongoClient = require("./mongo_client")
const Agenda = require("./agenda")
const routes = require("./routes")


const app = express()

MongoClient().then(mongoClient => Agenda(mongoClient).then(agenda => app.set("agenda", agenda)))

let basicAuthUsers = {}
basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
app.use(basicAuth({ users: basicAuthUsers, challenge: true }))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/api", routes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get("env") === "development" ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render("error")
})


module.exports = app