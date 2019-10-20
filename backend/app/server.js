import connectMongoDB from '../db/index.js';
import app from './app';

const PORT = process.env.PORT || 5000;

connectMongoDB();

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});