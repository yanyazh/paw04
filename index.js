'use strict';

const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let categories = ['funnyJoke', 'lameJoke'];

let funnyJoke = [
  { 'joke': 'Dlaczego komputer poszedł do lekarza?', 'response': 'Bo złapał wirusa!' },
  { 'joke': 'Dlaczego komputer nie może być głodny?', 'response': 'Bo ma pełen dysk!' },
  { 'joke': 'Co mówi jeden bit do drugiego?', 'response': '„Trzymaj się, zaraz się przestawiamy!”' }
];

let lameJoke = [
  { 'joke': 'Dlaczego programiści preferują noc?', 'response': 'Bo w nocy jest mniej bugów do łapania!' },
  { 'joke': 'Jak nazywa się bardzo szybki programista?', 'response': 'Błyskawiczny kompilator!' }
];

// Punkt końcowy 1: Pobierz listę kategorii żartów
app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

// Punkt końcowy 2: Pobierz losowy żart z wybranej kategorii
app.get('/jokebook/joke/:category', (req, res) => {
  const category = req.params.category;

  // Wybór kategorii żartu
  let jokes;
  if (category === 'funnyJoke') {
    jokes = funnyJoke;
  } else if (category === 'lameJoke') {
    jokes = lameJoke;
  } else {
    return res.status(404).json({ error: `no jokes for category [${category}]` });
  }

  // Wybór losowego żartu
  const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
  res.json(randomJoke);
});




app.get('/math/circle/:r', (req, res) => {
    const radius = parseFloat(req.params.r);


    if (isNaN(radius) || radius <= 0) {
        return res.status(400).json({ error: "Invalid radius. Please provide a positive number." });
    }

    const area = Math.PI * Math.pow(radius, 2);
    const circumference = 2 * Math.PI * radius;

    res.json({
        area: area.toFixed(2),
        circumference: circumference.toFixed(2)
    });
});

app.get('/math/rectangle/:width/:height', (req, res) => {
  const width = parseFloat(req.params.width);
  const height = parseFloat(req.params.height);

  if (isNaN(width) || width <= 0 || isNaN(height) || height <= 0) {
      return res.status(400).json({ error: "Invalid width or height. Please provide positive numbers." });
  }

  const area = width * height;
  const perimeter = 2 * (width + height);

  res.json({
      area: area,
      perimeter: perimeter
  });
});

app.get('/math/power/:base/:exponent', (req, res) => {
  const base = parseFloat(req.params.base);
  const exponent = parseFloat(req.params.exponent);
  const calculateRoot = req.query.root === 'true';

  if (isNaN(base) || isNaN(exponent)) {
      return res.status(400).json({ error: 'Invalid input' });
  }

  const result = Math.pow(base, exponent);
  const response = { result: result };

  if (calculateRoot) {
      response.root = Math.sqrt(base).toFixed(2);
  }

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
