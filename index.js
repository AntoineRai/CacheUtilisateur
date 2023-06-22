const express = require("express");
const app = express();

const port = 3000; // Choisissez le port que vous souhaitez utiliser

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
