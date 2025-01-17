const mongoose = require("mongoose")
const {Personne, Client} = require("../models/Personne.model")
const ClientCentreInteret = require("../models/ClientCentreInteret.model")
const Match = require("../models/Match.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const fs = require("fs")
const { generateFourDigitCode, sendFourDigitCodeEmail, transporter, calculerAge } = require("../services")
const { type } = require("os")

const signUpRequest = async (req, res) => {
    const {email, environnement} = req.body 
    try {
        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }
        
        const code = generateFourDigitCode(email)
        const secret = fs.readFileSync("./.meow/meowPr.pem")
        const token = jwt.sign({email, code}, secret, {expiresIn: '2m', algorithm: 'RS256'})

        if(environnement === "web") {
            const confirmationLink = `http://localhost:5173/email-verification?token=${token}`
            await sendFourDigitCodeEmail(code, email, "verif-email-mail.html", transporter, confirmationLink)
        } else {
            await sendFourDigitCodeEmail(code, email, "verif-email-mail.html", transporter)
        }

        return res.status(200).json({message: 'Veuillez vérifier votre boîte mail.', token});
    } catch (error) {
        const msg = 'Une erreur est survenue veuillez réessayer'
        console.log(error);
        return res.status(500).json({message: msg, erreur: error})
    }
}

const signUpEmailConfirm = async (req, res) => {
    const {token} = req.query
    const {digitCode} = req.body 
    try {
        if(!token) {
            return res.status(403).json({message: "Accès refusé"})
        } else {
            const secret = fs.readFileSync('./.meow/meowPb.pem')
            jwt.verify(token, secret, (err, decode) => {
                if(err) {
                    const Link = '/email-signup-methode'
                    return res.status(401).json({message: "Lien de validation expiré! Veuillez renvoyer votre email", lien: Link, redirectBack: true})
                } else {
                    if(digitCode.toString() === decode.code.toString()) {
                        const email = decode.email
                        const secret = fs.readFileSync("./.meow/meowPr.pem")
                        const email_token = jwt.sign({email}, secret, {algorithm: 'RS256'})
                        const Link = `/signUp-form?token=${email_token}`
                        return res.status(200).json({message: 'Code correct.', token: email_token, lien: Link});
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
    const session = await mongoose.startSession(); // Démarre une session
    session.startTransaction()
    try {
        const {nom, prenom, email, password, dateDeNaissance, taille, genre, intresse_par, latitude, longitude, relationId, centreInteretId} = req.body 
    
        const age = calculerAge(dateDeNaissance)
        if (age < 18) {
            return res.status(400).json({ message: 'Vous devez avoir au moins 18 ans pour vous inscrire.' });
        }

        const existingClient = await Client.findOne({ email });
        if (existingClient) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const photos = req.files.map(photo => `${req.protocol}://${req.get('host')}/uploads/${photo.filename}`)
         const adresse = latitude && longitude ? {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
         } : null;
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const rep = await Client.create([{
            nom,
            prenom,
            email,
            password: hashedPassword,
            taille,
            genre,
            intresse_par,
            dateDeNaissance,
            photos,
            adresse,
            relationId
        }],{session})

        if (centreInteretId) {
            await Promise.all(centreInteretId.split(',').map(ci => {
                return ClientCentreInteret.create([{
                    clientId: rep[0]._id,
                    centreInteretId: ci
                }],{session})
            }))
        }

        await session.commitTransaction()
        session.endSession()

        res.status(201).json({message: "Inscription réussie", rep})
        
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error);
        res.status(500).json({ message: 'Une erreur est survenue! Veuillez réessayer.' });
    }
}

const signIn = async (req, res) => {
    const {email, password} = req.body
    try {
        const personne = await Personne.findOne({email})
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
        console.log(error);
        const msg = 'Erreur lors de la connexion'
        return res.status(500).json({message: msg, erreur: error})
    }
}

const toggleLikeAndMatch = async (req, res) => {
    const session = await mongoose.startSession()
    session.startTransaction()

    try {
        const { id } = req.authData
        const { likedId } = req.body

        if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(likedId)) {
            return res.status(400).json({ message: "ID invalide." })
        }
        if (id === likedId) {
            return res.status(400).json({ message: "Vous ne pouvez pas liker votre propre profil." })
        }

        const client = await Client.findById(id).session(session)
        const favClient = await Client.findById(likedId).session(session)

        if (!client || !favClient) {
            await session.abortTransaction()
            return res.status(404).json({ message: "Utilisateur non trouvé." })
        }

        let likeState = false
        let msg = ''
        let matchCreated = false

        if (client.Likes.includes(likedId)) {
            client.Likes.pull(likedId)
            await client.save({ session })

            await Match.deleteOne({
                $or: [
                    { $and: [{ client1Id: id }, { client2Id: likedId }] },
                    { $and: [{ client1Id: likedId }, { client2Id: id }] }
                ]
            }).session(session)

            msg = `Vous avez disliké le profil de ${favClient.prenom}.`
        } else {
            client.Likes.push(likedId)
            await client.save({ session })
            likeState = true

            msg = `Vous avez liké le profil de ${favClient.prenom}.`

            if (favClient.Likes.includes(id)) {
                await Match.create([{ client1Id: likedId, client2Id: id }], { session })
                msg += " C'est un match !"
                matchCreated = true
            }
        }

        await session.commitTransaction()
        session.endSession()

        return res.status(200).json({ message: msg, likeState, matchCreated })
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        console.log(error);
        return res.status(500).json({ message: "Une erreur s'est produite.", error: error.message })
    }
}

const getAllClients = async (req, res) => {
    const { id } = req.authData
    try {

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({message: "Id invalid."})
        }

        const client = await Client.findById(id)
        if(!client) {
            return res.status(400).json({message: "Client non trouvé."})
        }

        if(!client.adresse || !client.adresse.coordinates || client.adresse.coordinates.length !== 2) {
            const totalClients = await Client.countDocuments();
            const clients = await Client.aggregate([
                {
                    $match: {
                        _id: { $ne:  mongoose.Types.ObjectId(id) }
                    }
                },
                {
                    $project: { password: 0 }
                },
                {
                    $sample: { size: totalClients - 1 }
                }
            ])

            return res.status(200).json({
                message: "Clients récupérés avec succès (aléatoire).",
                data: clients
            });
        }

        const userLocation = client.adresse.coordinates
        const clients = await Client.aggregate([
            {
                $match: {
                    _id: { $ne:  id }
                }
            },
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: userLocation
                    },
                    distanceField: "distance",
                    spherical: true
                },
            },
            {
                $sort: { distance: 1 }
            },
            {
                $project: {
                  password: 0
                },
            }
        ])

        return res.status(200).json({
            message: "Clients récupérés avec succès (proximité).",
            data: clients
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Une erreur s'est produite.", error: error.message })
    }
}

module.exports = {
    signUpRequest,
    signUpEmailConfirm,
    signUp,
    signIn,
    toggleLikeAndMatch,
    getAllClients
}