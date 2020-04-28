import React from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import Flag from "react-world-flags";
import NewsAlert from "../containers/NewsAlert";
import StateRow from "../components/StateRow";
import StateWiseCapacity from "../containers/StateWiseCapacity";
import Links from "../data/Links.json";

class India extends React.Component {
  state = {
    indStateWiseData: {},
    NewsData: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    const IND = await axios.get("https://covid19.mathdro.id/api/countries/IND");

    await axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        this.setState({
          indStateWiseData: response.data.data.statewise,
          confirmed: response.data.data.total.confirmed,
          recovered: response.data.data.total.recovered,
          deaths: response.data.data.total.deaths,
          updated: response.data.data.lastRefreshed,
          isLoaded: true
        });
      });

    console.log("India.js -> Updated", this.state.updated);
    await axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then(response => {
        const districts = response.data;
        this.setState({
          districtWise: districts,
          districtsLoaded: true
        });
        //console.log("DistrictWise Data : ", this.state.districtWise);
        //var data = this.findStateAndDistricts("Maharashtra");
        //console.log("data[0] - ", data /*[0].districtData*/);
      });

    /* this.indConfirm = IND.data.confirmed.value;
    this.indRecovered = IND.data.recovered.value;
    this.indDeaths = IND.data.deaths.value;*/

    this.lastupdate = IND.data.lastUpdate;
    const INDStatesData = this.state.indStateWiseData;

    this.setState({
      indData: IND.data,
      staterow: INDStatesData.map((state, index) => {
        return (
          <StateRow
            key={index}
            stateName={state.state}
            districts={this.findStateAndDistricts(state.state)}
            confirmed={state.confirmed}
            active={state.active}
            recovered={state.recovered}
            deaths={state.deaths}
          />
        );
      })
    });
  }

  findStateAndDistricts = stateName => {
    var stateData = this.state.districtWise.filter(
      state => state.state === stateName
    );

    return stateData;
  };
  isNaN(x) {
    return x === x && typeof x === "number";
  }
  render() {
    var lastupdated = new Date(this.lastupdate);
    var time = new Date().getHours() - lastupdated.getHours();
    //console.log("NaN ", lastupdated);
    var currTime = new Date();
    var upTime = this.state.updated;
    console.log("cur ", currTime, "updated ", lastupdated, "uptime ", upTime);
    // var timeStamp = formatDistance(currTime, lastupdated);
    // console.log("updated ", timeStamp);

    var helplineLinks = Links.Links.map((link, index) => (
      <li key={index} className="help-link-item">
        {link.Title === "State Wise Health Capacity" ? (
          <p>
            <NavLink to={link.Link}>{link.Title} </NavLink>
            <Route path={link.Link} component={StateWiseCapacity} />
          </p>
        ) : (
          <a href={link.Link} target="_blank" rel="noopener noreferrer">
            {link.Title}
          </a>
        )}
      </li>
    ));
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row text-center india animated animatedFadeInUp fadeInUp">
            <div className="col-md-6">
              <div className="mt-1 panel ind-panel">
                <div
                  className="panel-heading ind-pnl-head ind-pnl-1"
                  style={{ backgroundColor: "#133e4a", color: "#fff" }}
                >
                  {" "}
                  <Flag
                    code={"IN"}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px"
                    }}
                  />
                  India Overview
                  {this.isNaN(time) ? (
                    <span className="updateLabel">
                      Last Update About {time} Hour{time > 1 ? "s" : ""} Ago
                      &nbsp;
                      {+"  " +
                        lastupdated.getHours() +
                        ":" +
                        lastupdated.getMinutes() +
                        "   IST"}
                    </span>
                  ) : (
                    <span className="updateLabel">Last Update not Found</span>
                  )}
                </div>
                <div className="panel-body text-info">
                  <div className="status-map">
                    <div className="row">
                      <ul className="ind-stats">
                        <li className="text-primary">
                          <i className="far fa-check-circle icon" /> <br />{" "}
                          <p>
                            {this.state.isLoaded ? (
                              this.state.confirmed
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
                              String(
                                this.state.confirmed -
                                  this.state.recovered -
                                  this.state.deaths
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
                              this.state.recovered
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
                              this.state.deaths
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
                              (this.state.confirmed / 1000000).toFixed(2)
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
                                (this.state.recovered / this.state.confirmed) *
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
                                (this.state.deaths / this.state.confirmed) *
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
            <div className="col-md-6">
              <div className="mt-1 panel ind-panel ind-helpline">
                <div
                  className="panel-heading"
                  style={{ backgroundColor: "#133e4a", color: "#fff" }}
                >
                  {" "}
                  <Flag
                    code={"IN"}
                    style={{
                      height: "20px",
                      width: "20px",
                      marginRight: "10px"
                    }}
                  />
                  INDIA HELPLINE
                </div>
                <div className="panel-body ind-pnl-body text-info">
                  <br />
                  <br />
                  <marquee behavior="alternate">
                    <ul className="help-links">{helplineLinks}</ul>
                  </marquee>
                  <br />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="trending-lbl">
                  {" "}
                  COMPILED FROM STATE GOVT. DATA <br />
                  (State Table under Maintenance)
                </p>
                <div className="row state-table-container">
                  <div className=" table-responsive">
                    <table className="table table-fixed table-hover table-striped table-bordered state-table">
                      <thead className="thead-dark state-head">
                        <tr>
                          <th
                            scope="col"
                            className="col-4 "
                            style={{ fontSize: "90%" }}
                          >
                            State / UT
                          </th>
                          <th
                            scope="col"
                            className="col-2 "
                            style={{ fontSize: "90%" }}
                          >
                            Confirmed
                          </th>
                          <th
                            scope="col"
                            className="col-2 "
                            style={{ fontSize: "90%" }}
                          >
                            Recovered
                          </th>
                          <th
                            scope="col"
                            className="col-2 "
                            style={{ fontSize: "90%" }}
                          >
                            Deaths
                          </th>
                          <th
                            scope="col"
                            className="col-2 "
                            style={{ fontSize: "90%" }}
                          >
                            Active
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.isLoaded && this.state.districtsLoaded ? (
                          this.state.staterow
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
                </div>
              </div>
              <div className="col-md-6">
                <div className="news-section">
                  {" "}
                  <NewsAlert country="IN" />
                </div>
              </div>
            </div>
            {this.distt}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default India;
