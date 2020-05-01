const { gql } = require("apollo-server-express");

module.exports = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
`;
