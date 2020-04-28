import React from "react";
//import { NavLink } from "react-router-dom";
//import StatePage from "../containers/StatePage";

export default class StateRow extends React.Component {
  state = {
    showDistricts: false
  };

  handleShowDistricts = () => {
    const active = this.state.showDistricts;
    // console.log("active ", active);
    this.setState({ showDistricts: active ? false : true });
    console.clear();
  };

  render() {
    //  console.log("Show Districts ", this.state.showDistricts);

    var unknownDistrict =
      this.props.districts[0] &&
      this.props.districts[0].districtData.filter(
        district => district.district === "Unknown"
      );

    var districts =
      this.props.districts[0] &&
      this.props.districts[0].districtData
        .sort((d1, d2) => d2.confirmed - d1.confirmed)
        .filter(district => district.district !== "Unknown")
        .concat(unknownDistrict);

    /* console.log(
      "Unknown Districts for ",
      this.props.stateName + " : ",
      unknownDistrict
    );
    */
    var districtsTable =
      this.props.districts[0] &&
      districts.map((district, index) => (
        <tr key={index}>
          <td
            className="col-xs-7 col-md-7"
            style={{ textAlign: "left", fontSize: "90%", color: "#000" }}
          >
            {district.district === "Unknown" ? (
              <div>
                {" "}
                <button className="t-tip" style={{ border: "none" }}>
                  Unknown
                  <i className="fa fa-info-circle" />
                </button>
              </div>
            ) : (
              district.district
            )}
          </td>
          <td
            className="col-xs-5 col-md-5"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {district.confirmed}{" "}
          </td>
        </tr>
      ));

    return (
      <>
        <tr onClick={this.handleShowDistricts}>
          <td
            className="col-xs-4 country-name st-name"
            style={{ fontSize: "90%" }}
          >
            {/*<NavLink
          to={"/country/IN/state-UT/" + this.props.stateName}
          className="state-link"
        
          {props.stateName}
        </NavLink>
        >*/}
            <i className="fa fa-sort-down" />
            <p>{"   " + this.props.stateName}</p>
          </td>
          <td className="col-xs-2">{this.props.confirmed}</td>
          <td className="col-xs-2">{this.props.recovered}</td>
          <td className="col-xs-2">{this.props.deaths}</td>
          <td className="col-xs-2">{this.props.active}</td>
        </tr>

        {this.state.showDistricts && (
          <div className="dist-tab">
            <br />
            <button
              className="btn btn-outline-dark"
              onClick={this.handleShowDistricts}
            >
              Back
            </button>
            <table
              className="table table-hover table-striped table-bordered country-table district-table"
              style={{ width: "80px", marginLeft: "10%" }}
            >
              <thead className="thead">
                <tr style={{ width: "200px" }}>
                  <th className="col-xs-7 col-md-7" style={{ fontSize: "90%" }}>
                    {" "}
                    District
                  </th>
                  <th
                    className="col-xs-5 col-md-5"
                    style={{ fontSize: "90%", textAlign: "right" }}
                  >
                    Cases
                  </th>
                </tr>
              </thead>
              <tbody>{districtsTable}</tbody>
            </table>
          </div>
        )}
      </>
    );
  }
}
