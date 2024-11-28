const Personne = require("../models/Personne.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")

const signUp = async (req, res) => {

}

const signIn = async (req, res) => {
    const {email, password} = req.body
    try {
        const personne = await Personne.Personne.findOne({email})
        if(!personne) {
            return res.status(401).json({message: "Email ou mot de passe incorrect"})
        } else {
            const verifPassword = await bcrypt.compare(password, personne.password)
            if(!verifPassword) {
                return res.status(401).json({message: "Email ou mot de passe incorrect"})
            } else {
                const secret = fs.readFileSync("./.meow/meowPr.pem")
                const token = jwt.sign({
                    id: personne._id,
                    nom: personne.nom,
                    prenom: personne.prenom
                }, secret, {algorithm: "RS256"})
                const msg = 'Connexion réussie'
                return res.status(200).json({message: msg, token: token})
            }
        }
    } catch (error) {
        const msg = 'Erreur lors de la connexion'
        return res.status(500).json({message: msg, erreur: error})
    }
}


module.exports = {
    signUp,
    signIn
}