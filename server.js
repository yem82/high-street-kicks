import express from 'express';

const app = express();


app.get('/', (req, res) => {
  res.send("<h1>We're live!</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});