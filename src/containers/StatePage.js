import React from "react";
import axios from "axios";
import Scroll from "../ScrollToTop";

class StatePage extends React.Component {
  state = {
    StateWiseData: [],
    districtWiseData: [],
    currentState: "",
    stateData: "",
    topDistricts: [],
    isLoaded: false
  }; 

  componentDidMount() {
    console.log(this.props);
    this.getStateData();
  }

  async getStateData() {
    await axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        this.setState({
          StateWiseData: response.data.data.statewise,
          confirmed: response.data.data.total.confirmed,
          recovered: response.data.data.total.recovered,
          deaths: response.data.data.total.deaths,
          updated: response.data.data.lastRefreshed,
          isLoaded: true
        });
      });
    await axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then(response => {
        const districts = response.data;
        this.setState({
          districtWiseData: districts
        });
      });
    var found = this.findStateAndDistricts(this.props.match.params.sName);
    var unknownDistrict = found[0].districtData
      .sort((d1, d2) => d2.confirmed - d1.confirmed)
      .filter(district => district.district === "Unknown");

    console.log("Unknown", unknownDistrict);
    console.log("Sorted", found[0].districtData.concat(unknownDistrict));
    var stdata = this.findState(this.props.match.params.sName);
    var topDistricts = found[0].districtData.slice(0, 5);
    console.log("Top Districts", topDistricts);
    this.setState({
      currentState: found,
      stateData: stdata[0],
      topDistricts,
      isLoaded: true
    });
    console.log(" State Page  Data : ", this.state);
  }
  findState(stateName) {
    var stateData = this.state.StateWiseData.filter(
      state => state.state === stateName
    );
    return stateData;
  }

  findStateAndDistricts = stateName => {
    var stateData = this.state.districtWiseData.filter(
      state => state.state === stateName
    );
    return stateData;
  };

  sortUnknownDistrict() {}

  formatNumberCommas(num) {
    num = num.toString();
    var lastThree = num.substring(num.length - 3);
    var otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return res;
  }

  render() {
    var found = this.findStateAndDistricts(this.props.match.params.sName);
    console.log("found ", found);
    console.log(" State : ", this.state);
    var districtsTable =
      this.state.currentState[0] &&
      this.state.currentState[0].districtData.map((district, index) => (
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
          <td className="col-xs-3 col-md-3" style={{ fontSize: "12px" }}>
            <span className="text-danger" style={{ fontSize: "11px" }}>
              {district.delta.confirmed > 0
                ? "+" + district.delta.confirmed
                : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.confirmed)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {this.formatNumberCommas(district.active)}{" "}
          </td>
          <td className="col-xs-2 col-md-2" style={{ fontSize: "12px" }}>
            <span className="text-success" style={{ fontSize: "11px" }}>
              {district.delta.recovered > 0
                ? "+" + district.delta.recovered
                : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.recovered)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {" "}
            <span className="text-danger" style={{ fontSize: "11px" }}>
              {district.delta.deceased > 0 ? "+" + district.delta.deceased : ""}
            </span>
            &nbsp;
            {this.formatNumberCommas(district.deceased)}{" "}
          </td>
        </tr>
      ));
    var topDistricts = this.state.topDistricts.map((district, index) => {
      return (
        <ul key={index}>
          <li className="top-dist">
            <h5>{district.district}</h5> &nbsp; &nbsp;
            <p className="text-danger text-sm">
              {"+" + district.delta.confirmed + " "}
            </p>
            <h4 className="text-primary font-weight-bold">
              {district.confirmed}
            </h4>
          </li>
        </ul>
      );
    });
    return (
      <React.Fragment>
        <Scroll />
        <div className="container state-page animated animatedFadeInUp fadeInUp">
          <div className="row">
            <div className="col-md-6">
              <div className="panel ind-panel">
                <div
                  className="panel-heading ind-pnl-head ind-pnl-1"
                  style={{ backgroundColor: "#133e4a", color: "#fff" }}
                >
                  {this.props.match.params.sName}
                </div>
                <div className="panel-body text-info">
                  <div className="status-map">
                    <div className="row">
                      <ul className="ind-stats">
                        <li className="text-primary">
                          <i className="far fa-check-circle icon" /> <br />{" "}
                          <p>
                            {this.state.isLoaded ? (
                              this.state.stateData.confirmed
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Confirmed
                        </li>
                        <li className="text-warning">
                          <i className="far fa fa-bed icon" /> <br />{" "}
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              this.state.stateData.confirmed -
                              this.state.stateData.recovered -
                              this.state.stateData.deaths
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Active
                        </li>
                        <li className="text-success">
                          <i
                            className="fas fa-redo icon"
                            style={{ color: "#5cb85c" }}
                          />{" "}
                          <br />
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              this.state.stateData.recovered
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Recovered
                        </li>
                        <li className="text-danger">
                          <i
                            className="fas fa-ambulance icon"
                            style={{ color: "red" }}
                          />{" "}
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              this.state.stateData.deaths
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Deaths
                        </li>
                      </ul>
                    </div>
                    <hr className="ind-spr" />
                    <div className="row">
                      <ul className="ind-stats">
                        <li>
                          <i className="fas fa-file-medical icon" /> <br />
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              (
                                this.state.stateData.confirmed / 1369.56
                              ).toFixed(0)
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Cases per million
                        </li>

                        <li className=" text-success">
                          <i
                            className="fas fa-redo icon"
                            style={{ color: "green" }}
                          />{" "}
                          <br />
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              (
                                (this.state.stateData.recovered /
                                  this.state.stateData.confirmed) *
                                100
                              ).toFixed(2) + " %"
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "24px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Recovery Rate
                        </li>
                        <li className="text-danger">
                          <i
                            className="	fas fa-notes-medical icon"
                            style={{ color: "red" }}
                          />{" "}
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              (
                                (this.state.stateData.deaths /
                                  this.state.stateData.confirmed) *
                                100
                              ).toFixed(2) + " %"
                            ) : (
                              <i
                                className="fa fa-spinner fa-spin"
                                style={{ fontSize: "20px", fontWeight: "bold" }}
                              />
                            )}
                          </p>
                          Fatality Rate
                        </li>

                        <li className=" text-danger">
                          {/*<i
                            className="fas fa-ambulance icon"
                            style={{ color: "red" }}
                          />{" "}
                          <br />
                          <p className="i-data">
                            (
                              (this.state.deaths / this.state.confirmed) *
                              100
                            ).toFixed(2) + " %"
                          Fatality Rate*/}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 st-top-distt">
              <h4>TOP DISTRICTS</h4>
              {topDistricts}
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              StatePage under construction
              <table
                className="table table-hover table-striped table-bordered country-table state-district-table"
                id="districtTable"
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
                <tbody>
                  {this.state.isLoaded ? (
                    districtsTable
                  ) : (
                    <tr>
                      <td
                        className="col-md-12 col-xs-12"
                        style={{ textAlign: "center" }}
                      >
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "50px", marginTop: "20%" }}
                        />
                        <h4> Loading Data </h4>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="col-md-6">
              State Name : {this.props.match.params.sName}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StatePage;
