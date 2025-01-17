const express = require("express")
const { signUp, signIn, signUpRequest, signUpEmailConfirm, toggleLikeAndMatch, getAllClients } = require("../controllers/personne.controller")
const { uploadMultiple } = require("../middlewares/multer.middleware")
const { getCentreInterts } = require("../controllers/centreInteret.controller")
const verifToken = require("../middlewares/verifyToke.middleware")
const { getRelations } = require("../controllers/relation.controller")
const { toggleFavori, getFavoris, getFavoriCount } = require("../controllers/favori.controller")
const router = express.Router()

router.get('/', (req, res) => {
    res.send("hello api")
})

//Personnes
router.post("/api/personnes/signup-request", signUpRequest)
router.post("/api/personnes/signup-email-confirm", signUpEmailConfirm)
router.post("/api/personnes/signup", uploadMultiple, signUp)
router.post("/api/personnes/signin", signIn)
router.get("/api/personnes", verifToken, getAllClients)
router.patch("/api/personnes/add-likes", verifToken, toggleLikeAndMatch)

//Centre d'intérêt
router.get("/api/centres-dinterets", getCentreInterts)

//Relations
router.get("/api/relations", getRelations)

//Favori
router.route("/api/favoris")
    .post(verifToken, toggleFavori)
    .get(verifToken, getFavoris)
router.get("/api/favoris/count", verifToken, getFavoriCount)

module.exports = router