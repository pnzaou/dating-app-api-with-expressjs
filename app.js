const express = require("express")
const cors = require("cors")
const path = require("path")
const connexion = require("./src/db/db")
const router = require("./src/routes")
const { initializeCentresInterets } = require("./src/controllers/centreInteret.controller")
const app = express()
const port = 8080

app
.use(cors())
.use(express.json())
.use('/uploads', express.static(path.join(__dirname, "src/uploads")))
.use(router)

connexion().then(() => {
    initializeCentresInterets()
})

app.listen(port, () => {
    console.log(`http://localhost:8080`)
})