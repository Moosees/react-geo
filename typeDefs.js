const { gql } = require('apollo-server');

module.exports = gql`
  input CreatePinInput {
    title: String
    image: String
    content: String
    longitude: Float
    latitude: Float
  }

  type User {
    _id: ID
    name: String
    email: String
    picture: String
  }

  type Pin {
    _id: ID
    createdAt: String
    title: String
    content: String
    image: String
    latitude: Float
    longitude: Float
    author: User
    comments: [Comment]
  }

  type Comment {
    _id: ID
    text: String
    createdAt: String
    author: User
  }

  type Query {
    me: User
  }

  type Mutation {
    createPin(input: CreatePinInput!): Pin
  }
`;
