const Relation = require("../models/Relation.model")

const relations = [
    {
      nom: "Plan d'un soir",
      description: "Rencontre sans lendemain pour des moments passionnés et intenses."
    },
    {
      nom: "Relation sans engagement",
      description: "Profiter des moments sensuels ensemble sans attachement émotionnel."
    },
    {
        nom: "Relation sérieuse",
        description: "Construire une relation stable, profonde et durable avec une personne qui partage vos valeurs."
    },
    {
      nom: "Ami(e) avec bénéfices",
      description: "Un(e) partenaire régulier(e) pour des plaisirs partagés, sans prise de tête."
    },
    {
      nom: "Sexe occasionnel",
      description: "Des rencontres ponctuelles pour satisfaire les désirs réciproques."
    },
    {
      nom: "Partenaire fétichiste",
      description: "Explorer des fantasmes spécifiques avec quelqu'un de compatible."
    },
    {
      nom: "Couple libertin",
      description: "Rencontre avec des couples ou célibataires pour des expériences ouvertes et libres."
    },
    {
      nom: "Partenaire dominant/dominé",
      description: "Relation basée sur des jeux de rôle pour explorer des dynamiques de pouvoir sensuelles."
    },
    {
      nom: "Aventure discrète",
      description: "Moments de plaisir loin des regards indiscrets."
    },
    {
      nom: "Sexe virtuel",
      description: "Partage de moments intimes à distance, par messages, appels ou visio."
    },
    {
      nom: "Expérience à plusieurs",
      description: "Participer à des rencontres avec plusieurs partenaires pour des sensations décuplées."
    }
];

const initializeRelation = async () => {
    try {
        const count = await Relation.countDocuments()
        if(count === 0) {
            await Relation.create(relations)
            console.log("Relations initialisées avec succès !", count);
        } else {
            console.log("Relations déjà initialisées, aucune action nécessaire.", count);
        }
    } catch (error) {
        console.error("Erreur lors de l'initialisation des centres d'intérêt :", error);
    }
}

const getRelations = async (req, res) => {
    try {
        const rep = await Relation.find()
        return res.status(200).json({message: "relations récupérées avec succès!", data: rep})
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({message: "Erreur lors de la récupération des données", error})
    }
}


module.exports = {
    initializeRelation,
    getRelations
}
  