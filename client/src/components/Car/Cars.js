import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Spinner from "../Common/Spinner";
import CarCard from "./CarCard";

const ALL_CARS = gql`
  query GetCars($limit: Int!, $skip: Int!) {
    cars(limit: $limit, skip: $skip) {
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
  const [cars, setCars] = useState(null);
  const [getAllCars, { loading, data, error }] = useLazyQuery(ALL_CARS);

  useEffect(() => {
    getAllCars({ variables: { limit: 2, skip: 2 } });
  }, []);

  if (cars === null && data?.cars) {
    setCars(data.cars);
  }

  const fetchData = ({ deleteCar: { id } }) => {
    let updatedCars = cars.filter((item) => item.id !== id);

    setCars(updatedCars);
  };

  const renderCars = (carData) => {
    if (carData !== null && carData.length > 0) {
      return (
        <div className="card-group justify-content-center">
          {carData.map(({ id, name, make, company }) => (
            <CarCard
              key={id}
              id={id}
              name={name}
              make={make}
              company={company.name}
              fetchUpdatedData={fetchData}
            />
          ))}
        </div>
      );
    } else if (carData !== null && carData.length === 0) {
      return (
        <div className="card-group justify-content-center">
          <Link to="/add-car" className="btn btn-lg btn-primary">
            Please add some cars!
          </Link>
        </div>
      );
    } else {
      return <Spinner />;
    }
  };

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Cars</h1>
        <p className="lead text-center">See All Cars Here</p>
        {renderCars(cars)}
      </div>
    </div>
  );
};

export default Cars;
