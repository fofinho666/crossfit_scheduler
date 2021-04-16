const MongoClient = require("../mongo_client")

const cookiesCollection = async() => {
    const client = await MongoClient()
    const database = client.db("agenda")
    return database.collection("cookies")
}

const saveCookies = async (cookies) => {
    const collection = await cookiesCollection()

    await collection.deleteMany({})
    return await collection.insertMany(cookies)
}

const loadCookies = async () => {
    const collection = await cookiesCollection()

    const cursor = collection.find({}, {projection: {_id: 0}})
    return await cursor.toArray()
}

module.exports = {
    saveCookies,
    loadCookies
}
