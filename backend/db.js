const mysql = require("mysql");

// Connexion à la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "azerty",
  database: "bdd_esport",
});

// Vérification de la connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données:", err);
    return;
  }
  console.log("Connecté à la base de données");
});

module.exports = db;
