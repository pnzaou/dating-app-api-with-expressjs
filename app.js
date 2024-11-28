const express = require("express")
const cors = require("cors")
const app = express()
const port = 8080

app
.use(cors())
.use(express.json())

app.get("/", (req, res) => {
    res.send("hello api")
})

app.listen(port, () => {
    console.log(`http://localhost:8080`)
})