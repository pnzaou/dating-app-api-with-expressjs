const express = require("express")
const cors = require("cors")
const path = require("path")
const connexion = require("./db/db")
const router = require("./routes")
const { initializeCentresInterets } = require("./controllers/centreInteret.controller")
const { initializeRelation } = require("./controllers/relation.controller")
const app = express()
const port = 8080

app
.use(cors())
.use(express.json())
.use('/uploads', express.static(path.join(__dirname, "src/uploads")))
.use(router)

connexion().then(() => {
    initializeCentresInterets().then(() => {
        initializeRelation().then(() => {
            app.listen(port, () => {
                console.log(`http://localhost:8080`)
            })
        })
    })
})
