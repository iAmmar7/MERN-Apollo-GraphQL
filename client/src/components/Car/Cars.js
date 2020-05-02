import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Spinner from "../Common/Spinner";
import CarCard from "./CarCard";

const ALL_CARS = gql`
  {
    cars {
      id
      name
      make
      company {
        id
        name
      }
    }
  }
`;

const Cars = () => {
  const { loading, error, data } = useQuery(ALL_CARS);

  if (error) return <p>Error :(</p>;

  console.log(loading, error, data);

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Cars</h1>
        <p className="lead text-center">See All Cars Here</p>
        {loading ? (
          <Spinner />
        ) : (
          <div className="card-group justify-content-center">
            {data.cars.map(({ id, name, make, company }) => (
              <CarCard key={id} id={id} name={name} make={make} company={company.name} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
