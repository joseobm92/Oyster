import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password) {
      token
      user {
        username
        email
        _id
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;
export const ADD_COLLECTION = gql`
  mutation AddCollection(
    $name: String
    $symbol: String
    $address: String
    $supply: Float
    $sales: Float
    $logo: String
    $volume: Float
    $floor: Float
    $avg_price: Float
  ) {
    addCollection(
      name: $name
      symbol: $symbol
      address: $address
      supply: $supply
      sales: $sales
      logo: $logo
      volume: $volume
      floor: $floor
      avg_price: $avg_price
    ) {
      _id
      address
      avg_price
      logo
      floor
      name
      sales
      supply
      symbol
      volume
      website
    }
  }
`;

// remove collection from user favorites
export const REMOVE_COLLECTION = gql`
  mutation RemoveCollection($collectionId: ID!) {
    removeCollection(collectionId: $collectionId) {
      _id
      name
      address
    }
  }
`;

// add a project
export const ADD_PROJECT = gql`
  mutation AddProject(
    $name: String
    $symbol: String
    $address: String
    $supply: String
    $website: String
    $logo: String
  ) {
    addProject(
      name: $name
      symbol: $symbol
      address: $address
      supply: $supply
      website: $website
      logo: $logo
    ) {
      _id
      address
      logo
      name
      projectAuthor
      supply
      symbol
      website
      comments {
        commentAuthor
        commentText
        createdAt
        _id
      }
    }
  }
`;

// remove a project
export const REMOVE_PROJECT = gql`
  mutation RemoveProject($projectId: ID!) {
    removeProject(projectId: $projectId) {
      _id
      address
      logo
      name
      projectAuthor
      supply
      symbol
      website
      comments {
        createdAt
        commentText
        commentAuthor
        _id
      }
    }
  }
`;

// Add a comment to a project

export const ADD_COMMENT = gql`
  mutation AddComment($projectId: ID!, $commentText: String!) {
    addComment(projectId: $projectId, commentText: $commentText) {
      _id
      address
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
      logo
      name
      projectAuthor
      supply
      symbol
      website
    }
  }
`;

// Remove a comment from a project
export const REMOVE_COMMENT = gql`
  mutation RemoveComment($projectId: ID!, $commentId: ID!) {
    removeComment(projectId: $projectId, commentId: $commentId) {
      _id
      address
      logo
      name
      projectAuthor
      supply
      symbol
      website
      comments {
        _id
        commentAuthor
        commentText
        createdAt
      }
    }
  }
`;
