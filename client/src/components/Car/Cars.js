import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/react-hooks";
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

const CARS_COUNT = gql`
  query GetCarCount {
    carCount {
      totalCars
    }
  }
`;

const Cars = (props) => {
  const [cars, setCars] = useState(null);
  // const [getAllCars, { loading, data, error }] = useLazyQuery(ALL_CARS);
  // const [getCarCount, response] = useLazyQuery(CARS_COUNT);

  const allCars = useQuery(ALL_CARS, {
    variables: { limit: 6, skip: 0 },
  });

  if (cars === null && allCars?.data?.cars) {
    setCars(allCars.data.cars);
  }

  // useEffect(() => {
  //   //   getCarCount();
  //   getAllCars({ variables: { limit: 6, skip: Number(props.match.params.page) } });
  // }, []);

  // if (cars === null && data?.cars) {
  //   setCars(data.cars);
  // }

  // console.log(response?.data?.carCount?.totalCars);

  const fetchData = ({ deleteCar: { id } }) => {
    // let updatedCars = cars.filter((item) => item.id !== id);
    // setCars(updatedCars);
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

  let renderPageNumbers, firstPageItem, lastPageItem;
  const pageNumbers = [];

  // if (response?.data?.carCount?.totalCars) {
  //   const total = response?.data?.carCount?.totalCars;
  //   const lastPage = Math.ceil(total / 6);

  //   for (let i = 1; i <= Math.ceil(total / 6); i++) {
  //     pageNumbers.push(i);
  //   }

  //   renderPageNumbers = pageNumbers.map((number) => {
  //     return (
  //       <li
  //         key={number}
  //         className={Number(props.match.params.page) === number ? "page-item active-page" : ""}>
  //         <Link to={`/all-cars/${number}`} className="page-link">
  //           {number}
  //         </Link>
  //       </li>
  //     );
  //   });

  //   firstPageItem = (
  //     <li key={0} className="page-item">
  //       <Link to={`/all-cars/1`} className="page-link">
  //         &laquo;
  //       </Link>
  //     </li>
  //   );

  //   lastPageItem = (
  //     <li key={lastPage + 1} className="page-item">
  //       <Link to={`/all-cars/${lastPage}`} className="page-link">
  //         &raquo;
  //       </Link>
  //     </li>
  //   );
  // }

  return (
    <div className="profiles mt-2">
      <div className="col-md-12">
        <h1 className="display-4 text-center title">Cars</h1>
        <p className="lead text-center">See All Cars Here</p>
        {renderCars(cars)}

        <div className="card-group justify-content-center">
          <ul className="pagination-list">
            {firstPageItem}
            {renderPageNumbers}
            {lastPageItem}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cars;
