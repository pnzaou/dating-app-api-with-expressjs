const express = require("express")
const { signUp, signIn } = require("../controllers/personne.controller")
const router = express.Router()

router.post("/api/personnes/signup", signUp)
router.post("/api/personnes/signin", signIn)

module.exports = router