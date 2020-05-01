const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    companies: [Company!]!
    company(id: ID!): Company
  }

  extend type Mutation {
    addCompany(name: String!, location: String!): Company
  }

  type Company {
    id: ID!
    name: String!
    location: String!
    cars: [Car!]!
  }
`;
