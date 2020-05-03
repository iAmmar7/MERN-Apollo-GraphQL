import { gql } from "apollo-boost";

export const GET_COMPANIES = gql`
  {
    companies {
      id
      name
    }
  }
`;

export const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $location: String!) {
    addCompany(name: $name, location: $location) {
      id
      name
      location
    }
  }
`;
