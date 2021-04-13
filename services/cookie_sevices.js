const db = require("../db")

const saveCookies = async (cookies) => {
    const client = await db.client()
    const database = client.db("agenda")
    const collection = database.collection("cookies")

    await collection.deleteMany({})
    return await collection.insertMany(cookies)
}

const loadCookies = async () => {
    const client = await db.client()
    const database = client.db("agenda")
    const collection = database.collection("cookies")

    const cursor = collection.find({}, {projection: {_id: 0}})
    return await cursor.toArray()
}

module.exports = {
    saveCookies,
    loadCookies
}
