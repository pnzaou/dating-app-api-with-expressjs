const mongoose = require("mongoose")
require("dotenv").config()

const connexion = async () => {
    try {
        const rep = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connexion réussie à la bd: ${rep.connection.name}`);
    } catch (error) {
        console.log("Erreur lors de la connexion: ", error.message);
    }
}

module.exports = connexion