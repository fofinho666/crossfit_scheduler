const MongoClient = require("../mongo_client")

const jobsCollection = () => MongoClient()
    .then(client => client.db("agenda").collection("agendaJobs"))


const getAll = async () => {
    const collection = await jobsCollection()

    const cursor = collection.find({})
    return await cursor.toArray()
}
const getById = async (id) => {
    const collection = await jobsCollection()

    return await collection.findOne({"_id": id})
}

module.exports = {
    GetAll: getAll,
    GetById: getById
}