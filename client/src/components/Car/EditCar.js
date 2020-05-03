import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import TextField from "../Common/TextField";
import SelectList from "../Common/SelectList";
import Spinner from "../Common/Spinner";
import { EDIT_CAR, ALL_CARS } from "../../queries/Car";
import { GET_COMPANIES } from "../../queries/Company";

const EditCar = (props) => {
  const [name, setName] = useState("");
  const [make, setMake] = useState("");
  const [company, setCompany] = useState("");
  const [errors, setErrors] = useState({});

  if (props?.location?.state?.car) {
    const {
      location: {
        state: { car },
      },
    } = props;

    if (name === "") {
      setName(car.name);
    }
    if (make === "") {
      setMake(car.make);
    }
    if (company === "") {
      setCompany(car.company.id);
    }
  }

  const allCompanies = useQuery(GET_COMPANIES);
  const [editCar, { loading }] = useMutation(EDIT_CAR);

  const onSubmit = (e) => {
    e.preventDefault();

    if (name.trim().length < 1) {
      setErrors({ name: "Car name is required!" });
      return;
    } else if (make.trim().length < 4) {
      setErrors({ make: "Car making year must be 4 digit!" });
      return;
    } else if (company.length === 0) {
      setErrors({ company: "Car making company is required!" });
      return;
    } else {
      setErrors({});
    }

    editCar({
      variables: { carId: props.location.state.car.id, name: name, make: make, company: company },
      refetchQueries: [{ query: ALL_CARS, variables: { limit: 6, page: 1 } }],
      awaitRefetchQueries: true,
    })
      .then((res) => {
        console.log(res);
        props.history.push("/all-cars/1");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
      });
  };

  const getDropdownList = (arr) => {
    var list = [{ label: "* Choose...", value: "" }];

    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        list = [...list, { label: arr[i].name, value: arr[i].id }];
      }
    }
    return list;
  };

  let renderCompanies = null;
  if (allCompanies?.data?.companies?.length > 0) {
    renderCompanies = (
      <SelectList
        name="company"
        options={getDropdownList(allCompanies.data.companies)}
        value={company}
        onChange={({ target: { value } }) => setCompany(value)}
        error={errors.company}
        info="Select a company of this car"
      />
    );
  } else {
    renderCompanies = <Spinner />;
  }

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Edit Car</h1>
          <p className="lead text-center">Let's edit some info related to car!</p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="Car Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="A name of a car"
            />
            <TextField
              placeholder="Car Make"
              name="make"
              type="number"
              value={make}
              onChange={({ target: { value } }) => setMake(value)}
              error={errors.make}
              info="Making year of a car"
            />
            {renderCompanies}
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading || !allCompanies?.data?.companies?.length > 0}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditCar;
