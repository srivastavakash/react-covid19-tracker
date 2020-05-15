import React from "react";
import { NavLink, Route } from "react-router-dom";
import StatePage from "../containers/StatePage";

export default class StateRow extends React.Component {
  state = {
    showDistricts: false
  };

  handleShowDistricts = () => {
    const active = this.state.showDistricts;
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

    //console.log(this.props.stateName, this.props);

    /*  var totalConfirmed = 0;

    for (let distt of districts) {
      let con = totalConfirmed + distt.delta.confirmed;
      console.log("for loop ", con);
    }
    */
    /*
    var Confirmed =
      this.props.districts[0] &&
      districts.reduce((district, conf) => {
        return conf + district.delta.confirmed;
      });
    console.log("Total Confirmed ", Confirmed);*/

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
          <td style={{ fontSize: "9px" }}>
            <span class="text-danger" style={{ fontSize: "9px" }}>
              {district.delta.confirmed > 0
                ? "+" + district.delta.confirmed
                : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.confirmed)}{" "}
          </td>
          <td style={{ fontSize: "9px", textAlign: "right" }}>
            {this.formatNumberCommas(district.active)}{" "}
          </td>
          <td style={{ fontSize: "9px" }}>
            <span class="text-success" style={{ fontSize: "9px" }}>
              {district.delta.recovered > 0
                ? "+" + district.delta.recovered
                : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.recovered)}{" "}
          </td>
          <td style={{ fontSize: "9px", textAlign: "center" }}>
            {" "}
            <span class="text-danger" style={{ fontSize: "8px" }}>
              {district.delta.deceased > 0 ? "+" + district.delta.deceased : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.deceased)}{" "}
          </td>
        </tr>
      ));
    var stateData = this.props;

    return (
      <>
        <tr onClick={this.handleShowDistricts}>
          <td
            className="col-xs-3 col-md-3 country-name st-name"
            style={{ fontSize: "90%" }}
          >
            <i className="fa fa-sort-down" />
            <p>{"   " + this.props.stateName}</p>
          </td>
          <td className="col-xs-2 col-md-2">
            {this.formatNumberCommas(this.props.confirmed)}
          </td>
          <td className="col-xs-2 col-md-2">
            {this.formatNumberCommas(this.props.recovered)}
          </td>
          <td className="col-xs-2 col-md-2">
            {this.formatNumberCommas(this.props.deaths)}
          </td>
          <td className="col-xs-2 col-md-2 last-col">
            {this.formatNumberCommas(this.props.active)}
          </td>
        </tr>

        {this.state.showDistricts && (
          <div className="dist-tab">
            <br />
            <div className="row">
              <div className="col-12">
                <i
                  className="fas fa-arrow-alt-circle-left"
                  onClick={this.handleShowDistricts}
                  style={{
                    fontSize: "18px",
                    marginRight: "20px",
                    marginLeft: "0px"
                  }}
                />
                <NavLink
                  to={"/country/IN/state-UT/" + this.props.stateName}
                  className="state-link"
                >
                  <p className="btn btn-sm btn-dark text-light">
                    {"More about "}
                    {this.props.stateName}{" "}
                  </p>
                </NavLink>

                <table
                  className="table table-hover table-striped table-bordered country-table district-table st-dist"
                  style={{ marginLeft: "-5%" }}
                  id="districtTable"
                >
                  <thead className="thead bg-dark text-light">
                    <tr>
                      <th className="dist-thead"> District</th>
                      <th className="dist-thead">Confirmed</th>
                      <th className="dist-thead">Active</th>
                      <th className="dist-thead">Recovered</th>
                      <th className="dist-thead">Deaths</th>
                    </tr>
                  </thead>
                  <tbody>{districtsTable}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
