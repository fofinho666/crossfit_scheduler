const { MongoClient } = require("mongodb")

module.exports = () => MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
