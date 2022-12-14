const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    collections: [Collection] 
  }

  type Collection {
    _id: ID
    name: String
    symbol: String
    address: String
    supply: Float
    website: String
    logo: String
    sales: Float
    volume: Float
    floor: Float
    avg_price: Float
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
    users: [User]
    collection(collectionId: ID!): Collection
    collections(userId: ID!): [Collection]
    me: User
  }


  type Mutation {
    login (email: String!, password: String!): Auth
    signup (username: String!, email: String!, password: String!): Auth
    addCollection (name: String,
      symbol: String,
      address: String,
      supply: Float,
      website: String,
      logo: String,
      sales: Float,
      volume: Float,
      floor: Float,
      avg_price: Float) : Collection
    removeUser: User
  }
`;

module.exports = typeDefs;
