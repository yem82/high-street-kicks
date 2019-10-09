import express from 'express';
import shoesRouter from './routes/shoes';
import usersRouter from './routes/users';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'client/build')))

app.use(cors());

app.use(express.json());

app.use('/shoes', shoesRouter);
app.use('/users', usersRouter);

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('You have connected with MongoDB database');
}).on('error', (err) => {
  console.log('Error is: ', err);
});

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});