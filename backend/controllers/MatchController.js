const express = require("express");
const router = express.Router();
const db = require("../db");

// *********************************************************************************************

// ROUTE POUR RECUPERER LES DONNES DE LA TABLE "matchs"

// *********************************************************************************************

router.get("/", (req, res) => {
  console.log("Requête GET reçue pour /matchs");
  const sql = "SELECT * FROM matchs";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de la récupération des matchs:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des matchs" });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR CREER UN NOUVEAU MATCH

// *********************************************************************************************

router.post("/create-match", (req, res) => {
  console.log("Requête POST reçue pour /matchs/create-match");
  const sql =
    "INSERT INTO matchs (`id_tournoi`, `date`, `equipe1`, `equipe2`, `score_equipe1`, `score_equipe2`, `vainqueur`, `phase`, `status`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.id_tournoi,
    req.body.date,
    req.body.equipe1,
    req.body.equipe2,
    req.body.score_equipe1,
    req.body.score_equipe2,
    req.body.vainqueur,
    req.body.phase,
    req.body.status,
  ];
  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Erreur lors de la création du match:", err);
      return res.status(500).json("Error");
    }
    return res.status(200).json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR MODIFIER UN MATCH EXISTANT

// *********************************************************************************************

router.put("/update-match/:id", (req, res) => {
  console.log("Requête PUT reçue pour /matchs/update-match/:id");
  const sql =
    "UPDATE matchs SET `id_tournoi` = ?, `date` = ?, `equipe1` = ?, `equipe2` = ?, `score_equipe1` = ?, `score_equipe2` = ?, `vainqueur` = ?, `phase` = ?, `status` = ? WHERE id_match = ?";
  const values = [
    req.body.id_tournoi,
    req.body.date,
    req.body.equipe1,
    req.body.equipe2,
    req.body.score_equipe1,
    req.body.score_equipe2,
    req.body.vainqueur,
    req.body.phase,
    req.body.status,
  ];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du match:", err);
      return res.status(500).json("Erreur lors de la mise à jour du match");
    }
    return res
      .status(200)
      .json({ message: "Match mis à jour avec succès", data });
  });
});

// *********************************************************************************************

// ROUTE POUR SUPPRIMER UN MATCH

// *********************************************************************************************

router.delete("/:id", (req, res) => {
  console.log("Requête DELETE reçue pour /matchs/:id");
  const sql = "DELETE FROM matchs WHERE id_match = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la suppression du match:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

module.exports = router;
