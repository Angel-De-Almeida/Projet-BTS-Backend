const express = require("express");
const path = require("path");
const cors = require("cors");
const joueurController = require("./controllers/JoueurController");
const equipeController = require("./controllers/EquipeController");
const matchController = require("./controllers/MatchController");
const tournoiController = require("./controllers/TournoiController");
const userController = require("./controllers/UserController"); // Ajout de l'import pour le contrôleur des utilisateurs

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes au format JSON
app.use(express.json());
// Middleware pour gérer les requêtes CORS
app.use(cors());

// Définition du port d'écoute (5000 par défaut)
const port = process.env.PORT || 5000;

// Utilisation des différents contrôleurs
app.use("/joueurs", joueurController);
app.use("/equipes", equipeController);
app.use("/matchs", matchController);
app.use("/tournois", tournoiController);
app.use("/users", userController);

// Servir les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.use("/uploads", express.static("uploads"));

// Lancement du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en ligne sur le port ${port}`);
});
