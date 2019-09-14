import express from 'express';
import cors from 'cors';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import graphQLSchema from './graphql/schema/index';
import graphQLResolvers from './graphql/resolvers/index';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolvers,
  graphiql: true
  },
));

const uri = process.env.ATLAS_URI
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('You have connected with MongoDB database');
}).on('error', (err) => {
  console.log('Error is: ', err);
});

// import shoesRouter from './routes/shoes';
// import usersRouter from './routes/users';

// app.use('/shoes', shoesRouter);
// app.use('/users', usersRouter);

import path from 'path';

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

app.listen(PORT, () => {
  console.log(`auto baby on ${PORT}!`);
});