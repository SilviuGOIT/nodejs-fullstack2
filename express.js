const express = require("express");
const app = express();

app.use(express.json());

const agenda = [
  {
    name: "Paul",
    adresa: "Str Stirbei Voda 209",
    tel: "0232 23232 22222",
  },
  {
    name: "Silviu",
    adresa: "Str Stirbei Voda 33309",
    tel: "1112 11112 11112",
  },
  {
    name: "Ion",
    adresa: "Str Stirbei Voda 1133309",
    tel: "9299 2992 229992",
  },
];

// 1. Rută de informații personale: Creați o rută ('/info') care afișează numele, adresa și numărul de telefon al unei persoane pe pagină.
app.get("/info", (req, res) => {
  // interactionam cu o baza de date care o are o colectie de tip "useri" -> nume, adresa si numar de telefon
  console.log("Aceasta este ruta de info");
  res.json(agenda);
});

app.get("/info/:name", (req, res) => {
  const name = req.params.name;

  const contact = agenda.find((element) => element.name === name);

  if (contact) {
    res.json(contact);
  } else {
    res.json({ message: `${name} nu este in contacte` });
  }
});

app.delete("/info/:name", (req, res) => {
  const name = req.params.name;
  const contact = agenda.filter((element) => element.name === name);
  res.json(contact);
});

// 2. Rută de adunare: Creați o rută care acceptă doi parametri numerici și returnează suma lor.
app.get("/adunare/:numar1/:numar2", (req, res) => {
  console.log(req.params);
  const numar1 = Number(req.params.numar1);
  const numar2 = Number(req.params.numar2);
  const suma = numar1 + numar2;
  res.send(`Suma este ${suma}`);
});

// 3. Formular de contact: Creați un formular de contact simplu cu câmpuri pentru nume și mesaj.
// Procesați datele trimise prin formular și afișați mesajul pe o pagină separată.
app.post("/contact", (req, res) => {
  //console.log(req.body);
  const name = req.body.name;
  const mesaj = req.body.mesaj;

  res.send(`Mesajul trimis de ${name} are urmatorul mesaj: ${mesaj}`);
});

// 4. Afisarea orei curente: Creați o rută care afișează ora curentă pe pagină.
app.get("/ora", (req, res) => {
  const oraCurenta = new Date().toLocaleTimeString();
  res.send(`Aceasta este ora curenta: ${oraCurenta}`);
});

app.listen(4000, () => {
  console.log("Aplicatia noastra ruleaza pe portul 4000");
});
