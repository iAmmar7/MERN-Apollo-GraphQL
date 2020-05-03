import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/react-hooks";

import Spinner from "../Common/Spinner";
import CarCard from "./CarCard";
import { ALL_CARS } from "../../queries/Car";

const Cars = (props) => {
  const [cars, setCars] = useState(null);
  const [totalCars, setTotalCars] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);

  const [getAllCars, { data }] = useLazyQuery(ALL_CARS);

  function getData(number) {
    getAllCars({
      variables: { limit: 6, page: number },
      refetchQueries: [{ query: ALL_CARS, variables: { limit: 6, page: number } }],
      awaitRefetchQueries: true,
    });
  }

  useEffect(() => {
    console.log("useEffect run!", [props.match.params.page]);
    getData(parseInt(props.match.params.page));
  }, [props.match.params.page]);

  if (cars === null && data?.paginatedCars?.cars) {
    setCars(data.paginatedCars.cars);
    setTotalCars(data.paginatedCars.totalCars);
    setCurrentPage(data.paginatedCars.currentPage);
  }

  const changePage = (number) => {
    // setCurrentPage(number)
    props.history.push(`/all-cars/${number}`);
  };

  const carDeleted = (car) => {
    let updatedCars = cars.filter((item) => item.id !== car.deleteCar.id);

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

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  if (data?.paginatedCars?.cars) {
    const lastPage = Math.ceil(totalCars / 6);

    for (let i = 1; i <= Math.ceil(totalCars / 6); i++) {
      pageNumbers.push(i);
    }

    renderPageNumbers = pageNumbers.map((number) => {
      return (
        <li key={number} className="page-item">
          <button
            className={
              parseInt(props.match.params.page) === number
                ? "page-link btn bg-dark text-white"
                : "page-link btn text-dark"
            }
            onClick={() => changePage(number)}>
            {number}
          </button>
        </li>
      );
    });

    firstPageItem = (
      <li key={0} className="page-item">
        <button className="page-link btn text-dark" onClick={() => changePage(1)}>
          &laquo;
        </button>
      </li>
    );

    lastPageItem = (
      <li key={lastPage + 1} className="page-item">
        <button className="page-link btn text-dark" onClick={() => changePage(lastPage)}>
          &raquo;
        </button>
      </li>
    );
  }

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Cars</h1>
        <p className="lead text-center">See All Cars Here</p>
        {renderCars(cars)}

        {cars?.length > 0 ? (
          <div className="card-group justify-content-center">
            <ul className="pagination-list">
              {firstPageItem}
              {renderPageNumbers}
              {lastPageItem}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cars;
