const { MongoClient } = require("mongodb")

const database = function () {
    let _client = null

    async function connect() {
        try {
            return await MongoClient.connect(process.env.MONGODB_URI, { useUnifiedTopology: true })
        } catch (e) {
            return e
        }
    }

    async function client() {
        try {
            if (_client == null) {
                _client = await connect()
            }
            return _client
        } catch (e) {
            return e
        }
    }

    return {
        client: client
    }
}

module.exports = database()
