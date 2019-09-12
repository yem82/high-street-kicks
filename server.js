import express from 'express';
import cors from 'cors';
import { buildSchema } from 'graphql';
import graphqlHttp from 'express-graphql';
import mongoose from 'mongoose';
import Shoe from './models/shoe';
import User from './models/user';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.use('/graphql', graphqlHttp({
  schema: buildSchema(`
    type Shoe {
      _id: ID!
      name: String!
      brand: String!
      description: String!
      colour: String!
      quantity: Int!
      price: Float!
      size: Int!
      image: String
    }

    type User {
      _id: ID!
      name: String!
      email: String!
      password: String!
      password2: String!
      address: String!
      phone: Int!
    }

    input ShoeInput {
      name: String!
      brand: String!
      description: String!
      colour: String!
      quantity: Int!
      price: Float!
      size: Int!
      image: String
    }

    input UserInput {
      name: String!
      email: String!
      password: String!
      password2: String!
      address: String!
      phone: Int!
    }

    type RootQuery {
      shoes: [Shoe!]!
    }

    type RootMutation {
      createShoe(shoeInput: ShoeInput): Shoe
      createUser(userInput: UserInput): User
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),
  rootValue: {
    shoes: () => {
      return Shoe.find()
        .then(shoes => {
        return shoes.map(shoe => {
          return { ...shoe._doc }
       })
      })
      .catch(err => console.log(err))
    },
    createShoe: (args) => {

      const shoe = new Shoe({
        brand: args.shoeInput.brand,
        name: args.shoeInput.name,
        description: args.shoeInput.description,
        colour: args.shoeInput.colour,
        quantity: +args.shoeInput.quantity,
        price: +args.shoeInput.price,
        size: +args.shoeInput.size,
        image: args.shoeInput.image
      })
      return shoe
        .save()
        .then(result => {
          console.log(result);
          return {...result._doc};
      }).catch(err => {
          console.log(err);
          throw err;
      });
    },
    createUser: (args) => {
      const user = new User({
        name: args.userInput.name,
        email: args.userInput.email,
        password: args.userInput.password,
        password2: args.userInput.password2,
        email: args.userInput.email,
        address: args.userInput.address,
        phone: args.userInput.phone
      })
      return user
        .save()
        .then(result => {
          console.log(result);
          return {...result._doc};
      }).catch(err => {
          console.log(err);
          throw err;
      });
    }
  },
  graphiql: true
}));

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