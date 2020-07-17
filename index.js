require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");

const app = express();
app.use(formidable());
app.use(cors());

const API_KEY = "process.env.API_KEY";
const DOMAIN = "process.env.DOMAIN";
const mailgun = require("mailgun-js")({ apiKey: API_KEY, domain: DOMAIN });

app.post("/form", (req, res) => {
  console.log(req.fields);

  const data = {
    from: "Excited User <me@samples.mailgun.org>",
    to: "j.guyot_065@yahoo.fr",
    subject: "Nouveau message ! ",
    text: "Testing some Mailgun awesomeness!",
  };

  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });

  res.json({ message: "Données bien reçues" });
});
app.all("*", (req, res) => {
  res.json({ message: "Page introuvable" });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("Server started");
});
