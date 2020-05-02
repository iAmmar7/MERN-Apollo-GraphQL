import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import TextField from "../Common/TextField";

const ADD_COMPANY = gql`
  mutation AddCompany($name: String!, $location: String!) {
    addCompany(name: $name, location: $location) {
      id
      name
      location
    }
  }
`;

const AddCompany = (props) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});

  const [addCompany, { loading }] = useMutation(ADD_COMPANY);

  const onSubmit = (e) => {
    e.preventDefault();

    setErrors({});

    console.log(errors, name, location);

    if (name.trim().length < 1) {
      setErrors({ ...errors, name: "Compnay name is required!" });
      return;
    }
    if (location.trim().length < 1) {
      setErrors({ ...errors, location: "Compnay location is required!" });
      return;
    }

    addCompany({ variables: { name: name, location: location } })
      .then((res) => {
        console.log(res);
        props.history.push("/add-car");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));

        if (err?.graphQLErrors[0]?.message) {
          setErrors({ name: err?.graphQLErrors[0]?.message });
        }
      });
  };

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-md-8 m-auto">
          <h1 className="display-4 text-center title">Add Company</h1>
          <p className="lead text-center">Let's add some info related to company!</p>
          <form onSubmit={onSubmit}>
            <TextField
              placeholder="Company Name"
              name="name"
              type="text"
              value={name}
              onChange={({ target: { value } }) => setName(value)}
              error={errors.name}
              info="A name of a company"
            />
            <TextField
              placeholder="Location"
              name="location"
              type="text"
              value={location}
              onChange={({ target: { value } }) => setLocation(value)}
              error={errors.location}
              info="Location of a company"
            />
            <button
              type="submit"
              value="Submit"
              className="btn btn-dark btn-block mt-4"
              disabled={loading}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;
