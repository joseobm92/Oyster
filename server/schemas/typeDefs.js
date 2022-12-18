const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    collections: [Collection]
    projects: [Project]
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

  type Project {
    _id: ID
    name: String
    projectAuthor: String
    symbol: String
    address: String
    supply: String
    website: String
    logo: String
    createdAt: String
    comments: [Comment]
  }

  type Comment {
    _id: ID
    commentText: String
    commentAuthor: String
    createdAt: String
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
    projects: [Project]
    project(projectId: ID): Project
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    signup(username: String!, email: String!, password: String!): Auth
    addCollection(
      name: String
      symbol: String
      address: String
      supply: Float
      logo: String
      sales: Float
      volume: Float
      floor: Float
      avg_price: Float
    ): Collection
    removeUser: User
    removeCollection(collectionId: ID!): Collection
    addProject(
      name: String
      symbol: String
      address: String
      supply: String
      website: String
      logo: String
    ): Project
    removeProject(projectId: ID!): Project
    addComment(projectId: ID!, commentText: String!): Project
    removeComment(projectId: ID!, commentId: ID!): Project
  }
`;

module.exports = typeDefs;
