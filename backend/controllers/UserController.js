const express = require("express");
const router = express.Router();
const db = require("../db");

// *********************************************************************************************

// ROUTE POUR RECUPERER LES DONNES DE LA TABLE "users"

// *********************************************************************************************

router.get("/", (req, res) => {
  console.log("Requête GET reçue pour /users");
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de la récupération des users:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des users" });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR CREER UN USER

// *********************************************************************************************

router.post("/signup", (req, res) => {
  console.log("Requête POST reçue pour /users/signup");
  const sql = "INSERT INTO users (`nom`, `motdepasse`) VALUES (?)";
  const values = [req.body.nom, req.body.motdepasse];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Erreur lors de la création du joueur:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE VERIFICATION LOGIN

// *********************************************************************************************

router.post("/login", (req, res) => {
  console.log("Requête POST reçue pour /users/login");

  // Récupérer les données fournies par l'utilisateur
  const { nom, motdepasse } = req.body;

  // Vérifier si l'utilisateur existe dans la base de données
  const sql = "SELECT * FROM users WHERE nom = ? AND motdepasse = ?";
  db.query(sql, [nom, motdepasse], (err, data) => {
    if (err) {
      console.error("Erreur lors de la vérification de l'utilisateur:", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    // Vérifier si des données ont été retournées (si l'utilisateur existe)
    if (data.length === 0) {
      // L'utilisateur n'existe pas ou les informations d'identification sont incorrectes
      return res
        .status(401)
        .json({ error: "Nom d'utilisateur ou mot de passe incorrect" });
    }

    // L'utilisateur existe et les informations d'identification sont correctes
    return res.status(200).json({ message: "Connexion réussie" });
  });
});

module.exports = router;
