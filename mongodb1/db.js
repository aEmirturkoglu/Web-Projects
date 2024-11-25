const { mongoClient } = require("mongodb")

let dbConnection;

module.exports = {
  connectToDB: (cb) => {
    mongoClient.connect("mongodb://localhost:27017/books")
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch((err) => {
        console.error(err)
        return cb(err)
      })
  },
  getDB: () => dbConnection
}

