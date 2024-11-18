const express = require("express");
const app = express();

app.use(express.json());

app.use((request, response, next) => {
  console.log("Acesta este un middleware");
  next();
});

app.get("/name", (request, response) => {
  console.log("Calea este creata si functionala");
  response.send(`<h1>Acesta este calea de name</h1>`);
});

app.delete("/name", (request, response) => {
  response.send(`<h1>Acesta este calea de name</h1>`);
});

app.post("/name", (request, response) => {
  response.send(`<h1>Acesta este calea de name</h1>`);
});

app.listen(4000, () => {
  console.log("Aplicatia noastra ruleaza pe portul 4000");
});
