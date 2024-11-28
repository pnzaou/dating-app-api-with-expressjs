const Personne = require("../models/Personne.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { generateFourDigitCode, sendFourDigitCodeEmail, transporter } = require("../services")

const signUpRequest = async (req, res) => {
    const {email} = req.body 
    try {
        const code = generateFourDigitCode(email)
        const secret = fs.readFileSync("./.meow/meowPr.pem")
        const token = jwt.sign({email, code}, secret, {expiresIn: '2m', algorithm: 'RS256'})
        const confirmationLink = `http://localhost:5173/email-verification?token=${token}`

        await sendFourDigitCodeEmail(code, email, confirmationLink, "verif-email-mail.html", transporter)

        return res.status(200).json({message: 'Veuillez vérifier votre boîte mail.'});
    } catch (error) {
        const msg = 'Une erreur est survenue veuillez réessayer'
        console.log(error);
        return res.status(500).json({message: msg, erreur: error})
    }
}

const signUpEmailConfirm = async (req, res) => {
    const {token} = req.query
    const digitCode = req.body 
    try {
        if(!token) {
            return res.status(403).json({message: "Accès refusé"})
        } else {
            const secret = fs.readFileSync('./.meow/meowPb.pem')
            jwt.verify(token, secret, (err, decode) => {
                if(err) {
                    const Link = '/email-signup-methode'
                    return res.status(401).json({message: "Lien de validation expiré! Veuillez renvoyer votre email", lien: Link})
                } else {
                    if(digitCode.digitCode.toString() === decode.code.toString()) {
                        const email = decode.email
                        const secret = fs.readFileSync("./.meow/meowPr.pem")
                        const email_token = jwt.sign({email}, secret, {algorithm: 'RS256'})
                        const Link = `/signUp-form?token=${email_token}`
                        return res.status(200).json({message: 'Code correct.', lien: Link});
                    } else {
                        return res.status(401).json({message: "Code incorrect! Réessayez"})
                    }
                }
            })
        }
    } catch (error) {
        console.log(error);
        const msg = "Une erreur s'est produite veuillez réesayer"
        return res.status(500).json({message: msg, erreur: error})
    }
}

const signUp = async (req, res) => {
    const {nom, prenom, email, password, dateDeNaissance} = req.body 
    const photos = req.files.map(photo => `${req.protocol}://${req.get('host')}/uploads/${photo.filename}`)
    try {
        
    } catch (error) {
        
    }
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
    signUpRequest,
    signUpEmailConfirm,
    signUp,
    signIn
}