const CentreInteret = require("../models/CentreInteret.model")

const centresInteretsData = [
    { nom: "Cinéma" },
    { nom: "Lecture" },
    { nom: "Théâtre" },
    { nom: "Art plastique" },
    { nom: "Photographie" },
    { nom: "Musique" },
    { nom: "Football" },
    { nom: "Basket-ball" },
    { nom: "Randonnée" },
    { nom: "Yoga" },
    { nom: "Fitness" },
    { nom: "Danse" },
    { nom: "Cuisine maison" },
    { nom: "Cuisine du monde" },
    { nom: "Pâtisserie" },
    { nom: "Vin et œnologie" },
    { nom: "Food trucks" },
    { nom: "Road trips" },
    { nom: "Découverte de nouvelles cultures" },
    { nom: "Camping" },
    { nom: "Escalade" },
    { nom: "Safari" },
    { nom: "Jeux vidéo" },
    { nom: "Électronique" },
    { nom: "Tricot" },
    { nom: "Scrapbooking" },
    { nom: "Jardinage" },
    { nom: "Écologie" },
    { nom: "Méditation" },
    { nom: "Blogging/vlogging" },
    { nom: "Mode et stylisme" },
    { nom: "Anime et manga" },
    { nom: "Voitures et motos" },
    { nom: "Histoire" },
    { nom: "Astrologie" },
    { nom: "Collection" }
];

const initializeCentresInterets = async () => {
    try {
        const count = await CentreInteret.countDocuments()
        if(count === 0) {
            await CentreInteret.create(centresInteretsData)
            console.log("Centres d'intérêt initialisés avec succès !", count);
        } else {
            console.log("Centres d'intérêt déjà initialisés, aucune action nécessaire.", count);
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation des centres d'intérêt :", error);
    }
}

const getCentreInterts = async (req, res) => {
    try {
        const CI = await CentreInteret.find()
        return res.status(200).json({message: "Centre d'intérêt récupérés avec succès", CI})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Erreur lors de la récupération des données", error})
    }
}

module.exports = {
    initializeCentresInterets,
    getCentreInterts
}