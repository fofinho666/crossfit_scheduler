const {Agenda} = require("agenda")

module.exports = async (mongoClient) => {
    const agenda = new Agenda({ mongo: mongoClient.db("agenda") })

    await agenda.start()

    return agenda
}