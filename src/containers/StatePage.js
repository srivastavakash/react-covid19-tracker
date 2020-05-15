import React from "react";
import axios from "axios";
import populations from "../data/Population.json";
import Scroll from "../ScrollToTop";

class StatePage extends React.Component {
  state = {
    StateWiseData: [],
    districtWiseData: [],
    currentState: [],
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
          updated: response.data.data.lastRefreshed
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
    axios({
      url: "https://https://covidstat.info/graphql",
      method: "post",
      data: {
        query: `
          query {
            country(name: "India") {
              states {
                state
                historical {
                  date
                  cases
                  deaths
                  recovered
                  todayCases
                  todayRecovered
                  todayDeaths
                }
              }
            }
          }
            `
      }
    }).then(result => {
      console.log("Time Series", result.data);
    });
    var found = this.findStateAndDistricts(this.props.match.params.sName);
    var unknownDistrict = found[0].districtData
      .sort((d1, d2) => d2.confirmed - d1.confirmed)
      .filter(district => district.district === "Unknown");
    const states = this.state.StateWiseData.sort(this.compare);
    found[0].population = 0;
    for (let i = 0; i < states.length; i++) {
      if (found[0].state === populations.population[i].state) {
        found[0].population = populations.population[i].population;
      }
    }
    console.log("Sorted States", states, populations);
    //console.log("Unknown", unknownDistrict);
    //console.log("Sorted", found[0].districtData.concat(unknownDistrict));
    var stdata = this.findState(this.props.match.params.sName);
    var topDistricts = found[0].districtData.slice(0, 5);
    this.setState({
      currentState: found,
      stateData: stdata[0],
      topDistricts,
      isLoaded: true
    });
    //console.log(" State Page  Data : ", this.state);
  }
  findState(stateName) {
    var stateData = this.state.StateWiseData.filter(
      state => state.state === stateName
    );
    return stateData;
  }

  compare(a, b) {
    if (a.state < b.state) return -1;
    if (a.state > b.state) return 1;
    return 0;
  }

  findStateAndDistricts = stateName => {
    var stateData = this.state.districtWiseData.filter(
      state => state.state === stateName
    );
    return stateData;
  };

  sortUnknownDistrict() {}

  numberFormatter(value) {
    const numberFormatter = new Intl.NumberFormat("en-IN");
    return isNaN(value) ? "-" : numberFormatter.format(value);
  }

  render() {
    var found = this.findStateAndDistricts(this.props.match.params.sName);
    console.log("found ", found);
    console.log(" State : ", this.state);
    var sPopln =
      this.state.currentState[0] && this.state.currentState[0].population;
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
            {this.numberFormatter(district.confirmed)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2"
            style={{ fontSize: "90%", textAlign: "right" }}
          >
            {this.numberFormatter(district.active)}{" "}
          </td>
          <td className="col-xs-2 col-md-2" style={{ fontSize: "12px" }}>
            <span className="text-success" style={{ fontSize: "11px" }}>
              {district.delta.recovered > 0
                ? "+" + district.delta.recovered
                : ""}
            </span>
            &nbsp;
            {this.numberFormatter(district.recovered)}{" "}
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
            {this.numberFormatter(district.deceased)}{" "}
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
              {this.numberFormatter(district.confirmed)}
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
                              this.numberFormatter(
                                this.state.stateData.confirmed
                              )
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
                              this.numberFormatter(
                                this.state.stateData.confirmed -
                                  this.state.stateData.recovered -
                                  this.state.stateData.deaths
                              )
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
                              this.numberFormatter(
                                this.state.stateData.recovered
                              )
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
                              this.numberFormatter(this.state.stateData.deaths)
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
                                this.state.stateData.confirmed /
                                (this.state.currentState[0].population /
                                  1000000)
                              ).toFixed(2)
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
                  <h4 className="text-dark">
                    <button
                      className="t-tip-state"
                      style={{ border: "none", backgroundColor: "#fff" }}
                    >
                      Population :{this.numberFormatter(sPopln)}
                      &nbsp;
                      <sup>
                        <i
                          className="fa fa-info-circle"
                          style={{ fontSize: "12px", marginBottom: "10px" }}
                        />
                      </sup>
                    </button>
                  </h4>
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
                style={{ width: "90%" }}
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
