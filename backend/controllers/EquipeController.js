const multer = require("multer");
const fs = require("fs");
const express = require("express");
const router = express.Router();
const db = require("../db");

// *********************************************************************************************

// Configuration de multer pour l'upload d'images

// *********************************************************************************************

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage }).single("logo");

// *********************************************************************************************

// ROUTE POUR RECUPERER LES DONNES DE LA TABLE "equipes"

// *********************************************************************************************

router.get("/", (req, res) => {
  const sql = "SELECT * FROM equipes";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipes:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des équipes" });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR CREER UNE NOUVELLE EQUIPE

// *********************************************************************************************

router.post("/create-equipe", upload, (req, res) => {
  console.log("Requête POST reçue pour /equipes/create-equipe");

  const { nom_equipe, pays } = req.body;
  const logo = req.file;

  if (!logo) {
    return res.status(400).json({ message: "Aucun logo n'a été téléchargé." });
  }

  // Lire les données binaires de l'image
  const imageBinaryData = fs.readFileSync(logo.path);

  const sql =
    "INSERT INTO equipes (`nom_equipe`, `pays`, `logo`) VALUES (?, ?, ?)";
  const values = [nom_equipe, pays, imageBinaryData];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Erreur lors de la création de l'équipe :", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la création de l'équipe." });
    }
    return res.status(201).json({ message: "Équipe créée avec succès." });
  });
});

// *********************************************************************************************

// ROUTE POUR MODIFIER UNE EQUIPE

// *********************************************************************************************

router.put("/update-equipe/:id", (req, res) => {
  console.log("Requête PUT reçue pour /equipes/update-equipe/:id");

  const { nom_equipe, pays } = req.body;
  const id = req.params.id;

  const sql =
    "UPDATE equipes SET `nom_equipe` = ?, `pays` = ? WHERE id_equipe = ?";
  const values = [nom_equipe, pays, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'équipe :", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la mise à jour de l'équipe." });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR SUPPRIMER UNE EQUIPE

// *********************************************************************************************

router.delete("/:id", (req, res) => {
  console.log("Requête DELETE reçue pour /equipes/:id");

  const id = req.params.id;
  const sql = "DELETE FROM equipes WHERE id_equipe = ?";

  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la suppression de l'équipe :", err);
      return res
        .status(500)
        .json({ message: "Erreur lors de la suppression de l'équipe." });
    }
    return res.json(data);
  });
});

module.exports = router;
