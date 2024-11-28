const express = require("express")
const { signUp, signIn, signUpRequest, signUpEmailConfirm } = require("../controllers/personne.controller")
const router = express.Router()

router.post("/api/personnes/signup-request", signUpRequest)
router.post("/api/personnes/signup-email-confirm", signUpEmailConfirm)
router.post("/api/personnes/signup", signUp)
router.post("/api/personnes/signin", signIn)

module.exports = router