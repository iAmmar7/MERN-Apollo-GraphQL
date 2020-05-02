const { gql } = require("apollo-server-express");

module.exports = gql`
  extend type Query {
    cars(limit: Int!, skip: Int!): [Car!]!
    carCount: CarCount!
    car(id: ID!): Car
  }

  extend type Mutation {
    addCar(name: String!, make: String!, company: String): Car
    updateCar(carId: String!, name: String!, make: String!, company: String): Car
    deleteCar(carId: String!): Car
  }

  type Car {
    id: ID!
    name: String!
    make: String!
    company: Company!
  }

  type CarCount {
    totalCars: Int!
  }
`;
