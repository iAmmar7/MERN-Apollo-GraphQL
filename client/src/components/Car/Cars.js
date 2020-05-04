import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import AllCars from "./AllCars";
import { ALL_CARS } from "../../queries/Car";
import Spinner from "../Common/Spinner";

function Pagination({ totalCars, currentPage, history }) {
  if (totalCars === 0) {
    return null;
  }

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  const lastPage = Math.ceil(totalCars / 6);

  const changePage = (number) => {
    history.push(`/all-cars/${number}`);
  };

  for (let i = 1; i <= Math.ceil(totalCars / 6); i++) {
    pageNumbers.push(i);
  }

  renderPageNumbers = pageNumbers.map((number) => (
    <li key={number} className="page-item">
      <button
        className={
          parseInt(currentPage) === number
            ? "page-link btn bg-dark text-white"
            : "page-link btn text-dark"
        }
        onClick={() => changePage(number)}>
        {number}
      </button>
    </li>
  ));

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

  return (
    <div className="d-flex justify-content-center">
      <ul className="pagination-list">
        {firstPageItem}
        {renderPageNumbers}
        {lastPageItem}
      </ul>
    </div>
  );
}

const Cars = ({ history, match: { params } }) => {
  const [cars, setCars] = useState(null);
  const [totalCars, setTotalCars] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data, refetch } = useQuery(ALL_CARS, {
    variables: { limit: 6, page: parseInt(params.page) },
    fetchPolicy: "no-cache",
  });

  if (data?.paginatedCars?.cars && data?.paginatedCars?.cars !== cars) {
    setCars(data.paginatedCars.cars);
    setTotalCars(data.paginatedCars.totalCars);
    setLoading(false);
  }

  const carDeleteHandler = async (car) => {
    await refetch({ variables: { limit: 6, page: parseInt(params.page) } });

    if (cars.length === 1 && parseInt(params.page) !== 1) {
      history.push(`/all-cars/${params.page - 1}`);
    }
  };

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Cars</h1>
        <p className="lead text-center">See All Cars Here</p>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <AllCars
              carData={cars}
              carDeleted={carDeleteHandler}
              currentPage={params.page}
              history={history}
            />
            <Pagination totalCars={totalCars} currentPage={params.page} history={history} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
