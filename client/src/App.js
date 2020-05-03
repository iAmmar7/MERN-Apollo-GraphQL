import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import Navbar from "./components/Layout/Navbar";
import Landing from "./components/Layout/Landing";
import AddCompany from "./components/Company/AddCompany";
import AddCar from "./components/Car/AddCar";
import EditCar from "./components/Car/EditCar";
import Cars from "./components/Car/Cars";
import "./App.css";

const client = new ApolloClient({
  uri: "/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/add-company" component={AddCompany} />
          <Route exact path="/add-car" component={AddCar} />
          <Route exact path="/edit-car/:id" component={EditCar} />
          <Route exact path="/all-cars/:page" component={Cars} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
