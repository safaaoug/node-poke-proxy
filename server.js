const request = require("request");
const express = require("express");
const { result } = require("./mocks");

const PORT = process.env.PORT || 4005;
const POKE_URL = "https://pokeapi.co/api/v2/pokemon";

const app = express();
var router = express.Router();

router.get("/health", (req, res) => {
  res.send("ok");
});

router.get("/pokemon/all", (req, res) => {
  if (process.env.USE_MOCK) {
    res.send(result);
  }
  req.pipe(request(`${POKE_URL}?limit=1126`)).pipe(res);
});

router.get("/api/pokemon/:pokemonId?", (req, res) => {
  const pokemonId = req.params.pokemonId;
  req.pipe(request(`${POKE_URL}/${pokemonId}`)).pipe(res);
});

router.get("*", (req, res) => {
  res.json({ message: `Sorry, page not found` });
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
