const express = require("express");
const router = express.Router();
const db = require("../db");

// *********************************************************************************************

// ROUTE POUR RECUPERER LES DONNES DE LA TABLE "tournois"

// *********************************************************************************************

router.get("/", (req, res) => {
  console.log("Requête GET reçue pour /tournois");
  const sql = "SELECT * FROM tournois";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de la récupération des tournois:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des tournois" });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR CREER UN NOUVEAU TOURNOI

// *********************************************************************************************

router.post("/create-tournoi", (req, res) => {
  console.log("Requête POST reçue pour /tournois/create-tournoi");
  const sql =
    "INSERT INTO tournois (`nom_tournoi`, `date_debut`, `date_fin`, `nombre_equipes`, `status`, `vainqueur`, `cash_prize`, `organisateur`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.nom_tournoi,
    req.body.date_debut,
    req.body.date_fin,
    req.body.nombre_equipes,
    req.body.status,
    req.body.vainqueur,
    req.body.cash_prize,
    req.body.organisateur,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Erreur lors de la création du tournoi:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la création du tournoi" });
    }
    return res.status(200).json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR MODIFIER UN MATCH EXISTANT

// *********************************************************************************************

router.put("/update-tournoi/:id", (req, res) => {
  console.log("Requête PUT reçue pour /tournois/update-tournoi/:id");
  const sql =
    "UPDATE tournois SET `nom_tournoi` = ?, `date_debut` = ?, `date_fin` = ?, `nombre_equipes` = ?, `status` = ?, `vainqueur` = ?, `cash_prize` = ?, `organisateur` = ? WHERE id_tournoi = ?";
  const values = [
    req.body.nom_tournoi,
    req.body.date_debut,
    req.body.date_fin,
    req.body.nombre_equipes,
    req.body.status,
    req.body.vainqueur,
    req.body.cash_prize,
    req.body.organisateur,
    req.params.id,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du tournoi:", err);
      return res.status(500).json("Erreur lors de la mise à jour du tournoi");
    }
    return res
      .status(200)
      .json({ message: "Tournoi mis à jour avec succès", data });
  });
});

// *********************************************************************************************

// ROUTE POUR SUPPRIMER UN TOURNOI

// *********************************************************************************************

router.delete("/:id", (req, res) => {
  console.log("Requête DELETE reçue pour /tournois/:id");
  const sql = "DELETE FROM tournois WHERE id_tournoi = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la suppression du tournoi:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

module.exports = router;
