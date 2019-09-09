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
})

import shoesRouter from './routes/shoes';
import usersRouter from './routes/users';

app.use('/shoes', shoesRouter);
app.use('/users', usersRouter);

import path from 'path';

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});