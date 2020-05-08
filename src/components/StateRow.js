import React from "react";
import { NavLink, Route } from "react-router-dom";
import StatePage from "../containers/StatePage";

export default class StateRow extends React.Component {
  state = {
    showDistricts: false
  };

  handleShowDistricts = () => {
    const active = this.state.showDistricts;
    // console.log("active ", active);
    this.setState({ showDistricts: active ? false : true });
    //console.clear();
  };

  formatNumberCommas(num) {
    num = num.toString();
    var lastThree = num.substring(num.length - 3);
    var otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    //document.write(res);
    return res;
  }

  render() {
    console.log("State Row ", this.props);

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
            className="col-xs-3 col-md-3"
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
          <td className="col-xs-3 col-md-3" style={{ fontSize: "90%" }}>
            {this.formatNumberCommas(district.confirmed)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {this.formatNumberCommas(district.active)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {this.formatNumberCommas(district.recovered)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {this.formatNumberCommas(district.deceased)}{" "}
          </td>
        </tr>
      ));

    return (
      <>
        <tr onClick={this.handleShowDistricts}>
          <td
            className="col-xs-3 country-name st-name"
            style={{ fontSize: "90%" }}
          >
            <i className="fa fa-sort-down" />
            <p>{"   " + this.props.stateName}</p>
          </td>
          <td className="col-xs-2">
            {this.formatNumberCommas(this.props.confirmed)}
          </td>
          <td className="col-xs-2">
            {this.formatNumberCommas(this.props.recovered)}
          </td>
          <td className="col-xs-2">
            {this.formatNumberCommas(this.props.deaths)}
          </td>
          <td className="col-xs-2">
            {this.formatNumberCommas(this.props.active)}
          </td>
        </tr>

        {this.state.showDistricts && (
          <div className="dist-tab">
            <br />
            <div className="row">
              <div className="col-1">
                <i
                  className="fas fa-arrow-alt-circle-left"
                  onClick={this.handleShowDistricts}
                />
              </div>
              <div className="col-11">
                <NavLink
                  to={"/country/IN/state-UT/" + this.props.stateName}
                  className="state-link"
                >
                  <p className="btn btn-sm btn-dark">
                    {"More about "}
                    {this.props.stateName}{" "}
                  </p>
                </NavLink>

                <table
                  className="table table-hover table-striped table-bordered country-table district-table"
                  style={{ marginLeft: "-5%" }}
                >
                  <thead className="thead bg-dark text-light">
                    <tr>
                      <th
                        className="col-xs-3 col-md-3"
                        style={{ fontSize: "80%" }}
                      >
                        {" "}
                        District
                      </th>
                      <th
                        className="col-xs-3 col-md-3"
                        style={{ fontSize: "80%" }}
                      >
                        Confirmed
                      </th>
                      <th
                        className="col-xs-2 col-md-2"
                        style={{ fontSize: "80%" }}
                      >
                        Active
                      </th>
                      <th
                        className="col-xs-2 col-md-2"
                        style={{ fontSize: "80%" }}
                      >
                        Recovered
                      </th>
                      <th
                        className="col-xs-2 col-md-2"
                        style={{ fontSize: "80%" }}
                      >
                        Deaths
                      </th>
                    </tr>
                  </thead>
                  <tbody>{districtsTable}</tbody>
                </table>
              </div>
            </div>
            <Route
              path="/country/IN/state-UT/:sName"
              exact
              render={props => <StatePage {...props} />}
            />
          </div>
        )}
      </>
    );
  }
}
