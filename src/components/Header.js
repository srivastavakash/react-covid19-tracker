import React from "react";
import { Route, NavLink, Switch } from "react-router-dom";
import Home from "../containers/Home";
//import CountryData from "./CountryData";
import India from "../containers/India";
import Patients from "../containers/Patients";

export default function Header() {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-md navbar-fixed-top ml-auto">
        <a className="navbar-brand" href="https://emrpx.codesandbox.io/">
          <i className="fas fa-shield-virus" style={{ fontSize: "25px" }} />{" "}
          <span className="text-dark">Covid-19</span>{" "}
          <span className="text-danger">Tracker</span>
        </a>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars hamburger" />
          </span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to="/"
                className="nav-link"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                {" "}
                Home{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/country/IN"
                className="nav-link"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                {" "}
                INDIA{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/patients"
                className="nav-link"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                {" "}
                PATIENTS{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/covid19"
                className="nav-link"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                {" "}
                COVID-19{" "}
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link"
                data-toggle="collapse"
                data-target="#collapsibleNavbar"
              >
                {" "}
                About{" "}
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Switch>
        <Route path="/country/IN" exact component={India} />
        <Route path="/patients" exact component={Patients} />
        <Route path="/" exact component={Home} />
      </Switch>
    </React.Fragment>
  );
}
