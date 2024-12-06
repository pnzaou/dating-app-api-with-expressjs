const express = require("express")
const { signUp, signIn, signUpRequest, signUpEmailConfirm } = require("../controllers/personne.controller")
const { uploadMultiple } = require("../middlewares/multer.middleware")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello api")
})

router.post("/api/personnes/signup-request", signUpRequest)
router.post("/api/personnes/signup-email-confirm", signUpEmailConfirm)
router.post("/api/personnes/signup", uploadMultiple, signUp)
router.post("/api/personnes/signin", signIn)

module.exports = router