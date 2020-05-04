import React from "react";
import { Link } from "react-router-dom";

import CarCard from "./CarCard";
import Spinner from "../Common/Spinner";

const AllCars = ({ carData, carDeleted, currentPage, history }) => {
  if (carData !== null && carData.length > 0) {
    return (
      <div className="card-group justify-content-center">
        {carData.map(({ id, name, make, company }) => (
          <CarCard
            key={id}
            id={id}
            name={name}
            make={make}
            company={company}
            fetchUpdatedData={carDeleted}
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

export default AllCars;
