require("dotenv").config()
// require("./config/database").connect()
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    res.send("Homepage")
  })

module.exports = app