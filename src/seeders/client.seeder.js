const mongoose = require("mongoose")
const { Client } = require("../models/Personne.model")
const MONGO_URI = "mongodb+srv://enz:Bxxmin%4066%402024@premier-cluster-test.i1gqm07.mongodb.net/dating-app?retryWrites=true&w=majority&appName=Premier-Cluster-Test"

const clients = [
    {
      nom: "Dupont",
      prenom: "Jean",
      email: "jean.dupont@example.com",
      password: "password123",
      roleId: "6471eabcde1234567890abcd",
      genre: "Homme",
      intresse_par: "Femme",
      taille: 180,
      photos: ["https://t3.ftcdn.net/jpg/04/71/45/72/360_F_471457251_zWUubbxxE0fh7xuMUJZZKN8WMOtyBdcs.jpg"],
      adresse: {
        type: "Point",
        coordinates: [2.3522, 48.8566], // Paris
      },
      isCertified: true,
      dateDeNaissance: new Date("1990-05-15"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Durand",
      prenom: "Marie",
      email: "marie.durand@example.com",
      password: "securepass",
      roleId: "6471eabcde1234567890abce",
      genre: "Femme",
      intresse_par: "Homme",
      taille: 165,
      photos: ["https://media.allure.com/photos/618153bc590337268c4b06fd/3:2/w_3000,h_2000,c_limit/My%20Beautiful%20Black%20Hair%201.jpg'"],
      adresse: {
        type: "Point",
        coordinates: [4.8357, 45.7640], // Lyon
      },
      isCertified: false,
      dateDeNaissance: new Date("1995-07-20"),
      Likes: [],
      relationId: "6471eabcde1234567890abcf",
    },
    {
      nom: "Martin",
      prenom: "Paul",
      email: "paul.martin@example.com",
      password: "mypassword",
      roleId: "6471eabcde1234567890abcf",
      genre: "Homme",
      intresse_par: "Homme",
      taille: 175,
      photos: ["https://image.cdn2.seaart.ai/2024-07-11/cq7q2ale878c73biaosg-1/95c5ddd5a08a19157a94c6fef08ce591_high.webp"],
      adresse: {
        type: "Point",
        coordinates: [-0.1276, 51.5074], // London
      },
      isCertified: true,
      dateDeNaissance: new Date("1988-02-11"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Moreau",
      prenom: "Clara",
      email: "clara.moreau@example.com",
      password: "passw0rd",
      roleId: "6471eabcde1234567890abcd",
      genre: "Femme",
      intresse_par: "Femme",
      taille: 170,
      photos: ["https://cdn.pixabay.com/photo/2024/04/27/02/01/beautiful-woman-8722815_1280.jpg"],
      adresse: {
        type: "Point",
        coordinates: [2.1734, 41.3851], // Barcelona
      },
      isCertified: false,
      dateDeNaissance: new Date("1992-10-05"),
      Likes: ["6471eabcde1234567890abce", "6471eabcde1234567890abcf"],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Bernard",
      prenom: "Lucas",
      email: "lucas.bernard@example.com",
      password: "bernardpass",
      roleId: "6471eabcde1234567890abcf",
      genre: "Homme",
      intresse_par: "Femme",
      taille: 185,
      photos: ["https://img.pikbest.com/origin/10/00/02/90YpIkbEsTdpK.jpeg!w700wp"],
      adresse: {
        type: "Point",
        coordinates: [13.4050, 52.5200], // Berlin
      },
      isCertified: true,
      dateDeNaissance: new Date("1993-04-09"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Simon",
      prenom: "Laura",
      email: "laura.simon@example.com",
      password: "simonsafe",
      roleId: "6471eabcde1234567890abcd",
      genre: "Femme",
      intresse_par: "Homme",
      taille: 160,
      photos: ["https://img.freepik.com/photos-premium/belle-fille-dessinant-peinture-generative-ai_860599-74.jpg"],
      adresse: {
        type: "Point",
        coordinates: [3.0586, 50.6292], // Lille
      },
      isCertified: false,
      dateDeNaissance: new Date("1990-11-21"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Petit",
      prenom: "Antoine",
      email: "antoine.petit@example.com",
      password: "petitpassword",
      roleId: "6471eabcde1234567890abcf",
      genre: "Homme",
      intresse_par: "Femme",
      taille: 172,
      photos: ["https://i.pinimg.com/originals/5b/b9/16/5bb9166a1260a692eaa7701d33cf78a8.jpg"],
      adresse: {
        type: "Point",
        coordinates: [1.4442, 43.6047], // Toulouse
      },
      isCertified: true,
      dateDeNaissance: new Date("1985-12-30"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Roux",
      prenom: "Chloé",
      email: "chloe.roux@example.com",
      password: "rouxpass",
      roleId: "6471eabcde1234567890abcd",
      genre: "Femme",
      intresse_par: "Femme",
      taille: 168,
      photos: ["https://i.pinimg.com/236x/db/ac/13/dbac1316560947240939426dce7bce45.jpg"],
      adresse: {
        type: "Point",
        coordinates: [5.3698, 43.2965], // Marseille
      },
      isCertified: true,
      dateDeNaissance: new Date("1997-03-14"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Giraud",
      prenom: "Emma",
      email: "emma.giraud@example.com",
      password: "gir4ud!",
      roleId: "6471eabcde1234567890abcf",
      genre: "Femme",
      intresse_par: "Homme",
      taille: 174,
      photos: ["https://i.pinimg.com/236x/ca/88/3e/ca883e6daeffd5c94378ee46e5d68af9.jpg"],
      adresse: {
        type: "Point",
        coordinates: [4.3566, 50.8467], // Brussels
      },
      isCertified: false,
      dateDeNaissance: new Date("1989-06-23"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    },
    {
      nom: "Fabre",
      prenom: "Thomas",
      email: "thomas.fabre@example.com",
      password: "fabrepass",
      roleId: "6471eabcde1234567890abcd",
      genre: "Homme",
      intresse_par: "Femme",
      taille: 178,
      photos: ["https://i.pinimg.com/236x/fa/4a/33/fa4a3375ba52f913ce85fa02ed2762b8.jpg"],
      adresse: {
        type: "Point",
        coordinates: [7.2656, 43.7102], // Nice
      },
      isCertified: true,
      dateDeNaissance: new Date("1994-09-18"),
      Likes: [],
      relationId: "6471eabcde1234567890abcd",
    }
  ];
  

(async function createFakeClients () {
    try {
        await mongoose.connect(MONGO_URI)
        await Client.create(clients)
        return
    } catch (error) {
        console.log(error);
        return
    }
})()