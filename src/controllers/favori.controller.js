const Favori = require("../models/Favori.model")
const {Client} = require("../models/Personne.model")

const toggleFavori = async (req, res) => {
    const {id} = req.authData
    const {favId} = req.body

    try {
        const clientCible = await Client.findById(favId)
        if(!clientCible) {
            return res.status(404).json({message: "Le compte que vous voulez mettre en favori n'existe pas !"})
        }

        const existingFavori = await Favori.findOne({
            favorisant: id,
            favorisé: favId
        })

        if(existingFavori) {
            await Favori.findByIdAndDelete(existingFavori._id)
            return res.status(200).json({
                message: `${clientCible.prenom} a été retiré de vos favoris.`
            })
        } else {
            await Favori.create({
                favorisant: id,
                favorisé: favId
            })

            return res.status(201).json({
                message: `${clientCible.prenom} a été ajouté à vos favoris`
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Une erreur est survenue ! Veuillez réessayer.", 
            erreur: error.message
        })
    }
}


const getFavoris = async (req, res) => {
    const {id} = req.authData

    try {

        const favoriCount = await Favori.countDocuments({ favorisant: id });

        if(favoriCount === 0) {
            return res.status(200).json({message: "Vous n'avez aucun compte en favori"})
        }

        const favoris = await Favori.find({ favorisant: id })
            .populate('favorisé', 'nom prenom photos taille')
            .sort({ createdAt: -1 });

        const favorisFormatés = favoris.map(favori => ({
            id: favori._id,
            favoriséId: favori.favorisé._id,
            nom: favori.favorisé.nom,
            prenom: favori.favorisé.prenom,
            photos: favori.favorisé.photos,
            taille: favori.favorisé.taille,
            ajoutéLe: favori.createdAt
        }));

        return res.status(200).json({
            message: "Liste des favoris récupérée avec succès.",
            favoris: favorisFormatés
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur est survenue lors de la récupération des favoris.",
            erreur: error.message
        });
    }
}

const getFavoriCount = async (req, res) => {
    const { id } = req.authData 

    try {

        const favoriCount = await Favori.countDocuments({ favorisé: id });

        return res.status(200).json({
            message: "Nombre de favoris récupéré avec succès.",
            favoriCount
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Une erreur est survenue lors de la récupération du nombre de favoris.",
            erreur: error.message
        });
    }
};

module.exports = {
    toggleFavori,
    getFavoris,
    getFavoriCount
}