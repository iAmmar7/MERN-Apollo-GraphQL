import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="collapse navbar-collapse" id="mobile-nav">
        <ul className="navbar-nav ml-auto mr-auto">
          <li className="nav-item mr-3">
            <NavLink to="/add-company" className="nav-link" activeClassName="active">
              Add Company
            </NavLink>
          </li>
          <li className="nav-item mr-3">
            <NavLink to="/add-car" className="nav-link" activeClassName="active">
              Add Car
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/all-cars/1" className="nav-link">
              All Cars
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
