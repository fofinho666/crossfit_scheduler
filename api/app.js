const createError = require("http-errors")
const express = require("express")
const basicAuth = require("express-basic-auth")
const logger = require("morgan")
const MongoClient = require("./mongo_client")
const Agenda = require("./agenda")
const routes = require("./routes")
const path = require("path")


const app = express()

MongoClient().then(mongoClient => Agenda(mongoClient).then(agenda => app.set("agenda", agenda)))

let basicAuthUsers = {}
basicAuthUsers[process.env.AUTH_USERNAME] = process.env.AUTH_PASSWORD
app.use(basicAuth({ users: basicAuthUsers, challenge: true }))

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", express.static(path.join(__dirname, "../client/build")))
app.use("/api", routes)
app.use("*", (req, res) =>{ res.redirect("/") })

module.exports = app