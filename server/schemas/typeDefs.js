const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    collections: [Collection] 
  }

  type Collection {
    _id: ID!
    name: String!
    address: String!
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
    addCollection (name: String!, address: String!) : Collection
    removeUser: User
  }
`;

module.exports = typeDefs;
