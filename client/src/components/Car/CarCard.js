import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";

import { DELETE_CAR } from "../../queries/Car";

const CarCard = ({ id, name, make, company, fetchUpdatedData, history }) => {
  const [deleteCar, { loading }] = useMutation(DELETE_CAR);

  const carDeleteHandler = () => {
    deleteCar({ variables: { carId: id } })
      .then((res) => {
        console.log(res);

        fetchUpdatedData(res.data);
      })
      .catch((err) => console.log(err));
  };

  const carEditHandler = () => {
    history.push({
      pathname: `/edit-car/${id}`,
      state: { car: { id, name, make, company } },
    });
  };

  return (
    <div className="col-lg-3 col-md-4 card-width">
      <div className="card text-white bg-dark m-3 p-2 card-item">
        <div className="card-body text-center">
          <h5 className="card-title title">{name}</h5>
          <p className="card-text">{make}</p>
          <p className="card-text">{company.name}</p>
          <button className="btn btn-primary mr-2 px-3" onClick={carEditHandler}>
            Edit
          </button>
          <button className="btn btn-danger" onClick={carDeleteHandler} disabled={loading}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default withRouter(CarCard);
