import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('You have connected with MongoDB database');
}).on('error', (err) => {
  console.log('Error is: ', err);
});

import shoesRouter from './routes/shoes';
import usersRouter from './routes/users';

app.use('/shoes', shoesRouter);
app.use('/users', usersRouter);

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});