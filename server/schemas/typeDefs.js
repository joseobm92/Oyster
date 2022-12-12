const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    user(userId: ID!): User
  }

  type Mutation {
    login (email: String!, password: String!): Auth
    signup (username: String!, email: String!, password: String!): Auth
    removeUser: User
  }
`;

module.exports = typeDefs;
