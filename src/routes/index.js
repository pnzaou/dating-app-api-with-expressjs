const express = require("express")
const { signUp, signIn, signUpRequest, signUpEmailConfirm, toggleLikeAndMatch } = require("../controllers/personne.controller")
const { uploadMultiple } = require("../middlewares/multer.middleware")
const { getCentreInterts } = require("../controllers/centreInteret.controller")
const verifToken = require("../middlewares/verifyToke.middleware")
const { getRelations } = require("../controllers/relation.controller")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello api")
})

//Personnes
router.post("/api/personnes/signup-request", signUpRequest)
router.post("/api/personnes/signup-email-confirm", signUpEmailConfirm)
router.post("/api/personnes/signup", uploadMultiple, signUp)
router.post("/api/personnes/signin", signIn)
router.patch("/api/personnes/add-likes", verifToken, toggleLikeAndMatch)

//Centre d'intérêt
router.get("/api/centres-dinterets", getCentreInterts)

//Relations
router.get("/api/relations", getRelations)

module.exports = router