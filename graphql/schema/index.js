import { buildSchema } from 'graphql';

export default buildSchema(`
    type Order {
      _id: ID!
      shoe: Shoe!
      user: User!
      createdAt: String!
      updatedAt: String!
    }

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
      owner: User
      createdAt: String!
      updatedAt: String!
    }

    type User {
      _id: ID!
      name: String!
      email: String!
      password: String!
      address: String!
      phone: String!
      createdOrders: [Shoe!]!
      createdAt: String!
      updatedAt: String!
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
      address: String!
      phone: String!
    }

    type RootQuery {
      shoes: [Shoe!]!
      orders: [Order!]!
    }

    type RootMutation {
      createShoe(shoeInput: ShoeInput): Shoe
      createUser(userInput: UserInput): User
      createOrder(shoeId: ID!): Order!
      cancelOrder(orderId: ID!): Shoe!
    }
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `)