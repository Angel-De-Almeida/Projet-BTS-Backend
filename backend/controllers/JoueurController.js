const express = require("express");
const router = express.Router();
const db = require("../db");

// *********************************************************************************************

// ROUTE POUR RECUPERER LES DONNES DE LA TABLE "joueurs"

// *********************************************************************************************

router.get("/", (req, res) => {
  console.log("Requête GET reçue pour /joueurs");
  const sql = "SELECT * FROM joueurs";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Erreur lors de la récupération des joueurs:", err);
      return res
        .status(500)
        .json({ error: "Erreur lors de la récupération des joueurs" });
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR CREER UN NOUVEAU JOUEUR

// *********************************************************************************************

router.post("/create-joueur", (req, res) => {
  console.log("Requête POST reçue pour /joueurs/create-joueur");
  const sql = "INSERT INTO joueurs (`pseudo`, `role`, `id_equipe`) VALUES (?)";
  const values = [req.body.pseudo, req.body.role, req.body.id_equipe];
  db.query(sql, [values], (err, data) => {
    if (err) {
      console.error("Erreur lors de la création du joueur:", err);
      return res.json("Error");
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR MODIFIER UN NOUVEAU JOUEUR

// *********************************************************************************************

router.put("/update-joueur/:id", (req, res) => {
  console.log("Requête PUT reçue pour /joueurs/update-joueur/:id");
  const sql =
    "UPDATE joueurs SET `pseudo` = ?, `role` = ?, `id_equipe` = ? WHERE id_joueur = ?";
  const values = [req.body.pseudo, req.body.role, req.body.id_equipe];
  const id = req.params.id;
  db.query(sql, [...values, id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du joueur:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

// *********************************************************************************************

// ROUTE POUR SUPPRIMER UN NOUVEAU JOUEUR

// *********************************************************************************************

router.delete("/:id", (req, res) => {
  console.log("Requête DELETE reçue pour /joueurs/:id");
  const sql = "DELETE FROM joueurs WHERE id_joueur = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) {
      console.error("Erreur lors de la suppression du joueur:", err);
      return res.status(500).json("Error");
    }
    return res.json(data);
  });
});

module.exports = router;
