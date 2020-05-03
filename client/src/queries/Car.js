import { gql } from "apollo-boost";

export const ADD_CAR = gql`
  mutation AddCar($name: String!, $make: String!, $company: String!) {
    addCar(name: $name, make: $make, company: $company) {
      id
      name
      make
    }
  }
`;

export const EDIT_CAR = gql`
  mutation EditCar($carId: String!, $name: String!, $make: String!, $company: String!) {
    updateCar(carId: $carId, name: $name, make: $make, company: $company) {
      id
      name
      make
    }
  }
`;

export const ALL_CARS = gql`
  query GetCars($limit: Int!, $page: Int!) {
    paginatedCars(limit: $limit, page: $page) {
      cars {
        id
        name
        make
        company {
          id
          name
        }
      }
      totalCars
      currentPage
      perPage
      totalPages
    }
  }
`;

export const DELETE_CAR = gql`
  mutation DeleteCar($carId: String!) {
    deleteCar(carId: $carId) {
      id
      name
    }
  }
`;
