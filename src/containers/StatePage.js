import React from "react";
import axios from "axios";
import populations from "../data/Population.json";
import Scroll from "../ScrollToTop";
import { stateCodeAndNames } from "../data/stateNameCodes";

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
      .then((response) => {
        this.setState({
          StateWiseData: response.data.data.statewise,
          // confirmed: response.data.data.total.confirmed,
          // recovered: response.data.data.total.recovered,
          // deaths: response.data.data.total.deaths,
          updated: response.data.data.lastRefreshed
        });
      });

    await axios
      .get("https://api.covid19india.org/v4/min/data.min.json")
      .then((response) => {
        let stData = response.data;
        var states_data = Object.entries(stData);
        console.log("State new req data ", states_data);
        states_data.splice(33, 1);
        console.log("State new req data after filter TT ", states_data);
        this.setState({
          stateNewData: states_data
        });
      });

    await axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then((response) => {
        const districts = response.data;
        this.setState({
          districtWiseData: districts
        });
      });

    var found = this.findStateAndDistricts(this.props.match.params.sName);

    //const ST_NEW_DATA = this.state.stateNewData;

    var ST_NEW_DATA = [];
    const stateCodesAndNames = Object.entries(stateCodeAndNames);

    for (let statesObj of this.state.stateNewData) {
      //console.log("statesObj", statesObj[1]);
      ST_NEW_DATA.push(statesObj[1]);
    }

    console.log("ST_NEW_DATA before adding total object ", ST_NEW_DATA);

    var states = this.state.StateWiseData;

    found[0].districtData
      .sort((d1, d2) => d2.confirmed - d1.confirmed)
      .filter((district) => district.district === "Unknown");
    states = this.state.StateWiseData.sort(this.compare);
    states.splice(30, 1);
    found[0].population = 0;

    for (let i = 0; i < stateCodesAndNames.length; i++) {
      let stateCode = stateCodesAndNames[i][0];
      let stateName = stateCodesAndNames[i][1];
      console.log(
        this.state.stateNewData[i][0],
        stateCode,
        this.state.stateNewData[i][0] === stateCode
      );
      //if (this.state.stateNewData[i][0] === stateCode)
      ST_NEW_DATA[i].total.state = stateName;
    }

    console.log("ST_NEW_DATA ", ST_NEW_DATA);

    console.log(states[19].total);

    states[11].total = ST_NEW_DATA[11].total;
    states[12].total = ST_NEW_DATA[12].total;
    states[13].total = ST_NEW_DATA[13].total;
    states[14].total = ST_NEW_DATA[14].total;
    states[19].total = ST_NEW_DATA[19].total;
    states[20].total = ST_NEW_DATA[19].total;
    states[22].total = ST_NEW_DATA[22].total;
    states[26].total = ST_NEW_DATA[26].total;
    states[27].total = ST_NEW_DATA[27].total;
    states[30].total = ST_NEW_DATA[30].total;
    states[31].total = ST_NEW_DATA[31].total;

    console.log(states[19].total);

    console.log("StateWiseData ", states);

    for (let i = 0; i < states.length; i++) {
      if (found[0].state === populations.population[i].state) {
        found[0].population = populations.population[i].population;
      }
      if (ST_NEW_DATA[i].total.state !== states[i].state)
        console.log(
          ST_NEW_DATA[i].total.state === states[i].state,
          i + "/" + states.length,
          ST_NEW_DATA[i].total.state,
          ",",
          states[i].state
        );
      states[i].total = ST_NEW_DATA[i].total;
    }

    for (let s = 0; s < ST_NEW_DATA.length; s++) {
      states[s].confirmed = ST_NEW_DATA[s].total.confirmed;
      states[s].deceased = ST_NEW_DATA[s].total.deceased;
      states[s].recovered = ST_NEW_DATA[s].total.recovered;
      states[s].active =
        ST_NEW_DATA[s].total.confirmed -
        ST_NEW_DATA[s].total.recovered -
        ST_NEW_DATA[s].total.deceased;
      states[s].tested = ST_NEW_DATA[s].total.tested;
      states[s].vaccinated = ST_NEW_DATA[s].total.vaccinated;
    }

    this.setState({
      StateWiseData: states
    });

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
      (state) => state.total.state === stateName
    );
    return stateData;
  }

  compare(a, b) {
    if (a.state < b.state) return -1;
    if (a.state > b.state) return 1;
    return 0;
  }

  findStateAndDistricts = (stateName) => {
    var stateData = this.state.districtWiseData.filter(
      (state) => state.state === stateName
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
      this.props.match.params.sName === "Madhya Pradesh"
        ? 82232000
        : this.state.currentState[0] && this.state.currentState[0].population;
    var districtsTable =
      this.state.currentState[0] &&
      this.state.currentState[0].districtData.map((district, index) => (
        <tr key={index} className="st-dist-row">
          <td className="col-xs-3 col-md-3 st-dist-name">
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
            <br /> <br />
          </td>
          <td className="col-xs-3 col-md-3 st-dist-data">
            <span className="text-danger st-dist-span">
              {district.delta.confirmed > 0
                ? "+" + district.delta.confirmed
                : ""}
            </span>
            <br />
            {this.numberFormatter(district.confirmed)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2 st-dist-data"
            style={{ textAlign: "right" }}
          >
            <br />
            {this.numberFormatter(district.active)}{" "}
          </td>
          <td className="col-xs-2 col-md-2 st-dist-data">
            <span className="text-success st-dist-span">
              {district.delta.recovered > 0
                ? "+" + district.delta.recovered
                : ""}
            </span>
            <br />
            {this.numberFormatter(district.recovered)}{" "}
          </td>
          <td
            className="col-xs-2 col-md-2 st-dist-data"
            style={{ textAlign: "right" }}
          >
            {" "}
            <span className="st-dist-span" style={{ color: "#ff073a" }}>
              {district.delta.deceased > 0 ? "+" + district.delta.deceased : ""}
            </span>
            <br />
            {this.numberFormatter(district.deceased)}{" "}
          </td>
        </tr>
      ));
    var topDistricts = this.state.topDistricts.map((district, index) => {
      return (
        <ul key={index}>
          <li className="top-dist row">
            <div className="col-md-4 col-sm-4 col-xs-4">
              <h5>{district.district}</h5> &nbsp; &nbsp;
            </div>
            <div className="col-md-3 col-sm-3 col-xs-3">
              <p className="text-danger text-sm">
                {district.delta.confirmed > 0
                  ? "+" + district.delta.confirmed + " "
                  : ""}
              </p>
            </div>
            <div className="col-md-5 col-sm-5 col-xs-5">
              <h4 className="text-primary text-center font-weight-bold">
                {this.numberFormatter(district.confirmed)}
              </h4>
            </div>
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
                  style={{
                    fontSize: "130%",
                    backgroundColor: "#d3d8de",
                    height: "40px"
                  }}
                >
                  {this.props.match.params.sName}
                </div>
                <div className="panel-body text-info">
                  <div className="status-map">
                    <div className="row">
                      <ul className="state-stats">
                        <li className="text-primary stats-conf-ind">
                          <br />
                          <i className="far fa-check-circle icon" /> <br />
                          Confirmed
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
                        </li>
                        <li className="text-dark stats-active-ind">
                          <br />
                          <i className="far fa fa-bed icon" /> <br />
                          Active
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
                        </li>
                        <li className="stats-rec-ind">
                          <br />
                          <i
                            className="fas fa-redo icon"
                            style={{ color: "#5cb85c", fontSize: "20px" }}
                          />
                          <br />
                          {" Recovered "}
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
                        </li>
                      </ul>
                    </div>
                    <hr className="ind-spr" />
                    <div className="row">
                      <ul className="state-stats-1">
                        <li className="text-danger stats-dec-ind">
                          <br />
                          <i
                            className="fas fa-ambulance icon"
                            style={{ color: "red" }}
                          />
                          <br />
                          {"Deaths "}
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
                        </li>
                        <li className="ind-permillion">
                          {" "}
                          <br />
                          <i className="fas fa-file-medical icon" /> <br />
                          <p className="i-data">
                            {this.state.isLoaded ? (
                              (this.props.match.params.sName ===
                              "Madhya Pradesh"
                                ? this.state.stateData.confirmed /
                                  (82232000 / 1000000)
                                : this.state.stateData.confirmed /
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

                        <li className=" text-success stats-rec-ind ">
                          {" "}
                          <br />
                          <i
                            className="fas fa-redo icon"
                            style={{ color: "green", fontSize: "20px" }}
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
                        <li className="text-danger stats-dec-ind">
                          {" "}
                          <br />
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
                  <hr className="ind-spr" />
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
                className="table table-fixed table-hover table-striped table-bordered country-table state-district-table"
                id="districtTable"
                style={{ width: "95%" }}
              >
                <thead className="thead bg-dark text-light">
                  <tr>
                    <th
                      className="col-xs-3 col-md-3"
                      style={{ fontSize: "70%" }}
                    >
                      {" "}
                      District
                    </th>
                    <th
                      className="col-xs-3 col-md-3"
                      style={{ fontSize: "70%" }}
                    >
                      Confirmed
                    </th>
                    <th
                      className="col-xs-2 col-md-2"
                      style={{ fontSize: "70%" }}
                    >
                      Active
                    </th>
                    <th
                      className="col-xs-2 col-md-2"
                      style={{ fontSize: "70%" }}
                    >
                      Rcvrd
                    </th>
                    <th
                      className="col-xs-2 col-md-2"
                      style={{ fontSize: "70%" }}
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
