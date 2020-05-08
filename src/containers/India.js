import React from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Line, Bar } from "react-chartjs-2";
import Flag from "react-world-flags";
import NewsAlert from "../containers/NewsAlert";
import StateRow from "../components/StateRow";
import StateWiseCapacity from "../containers/StateWiseCapacity";
import Links from "../data/Links.json";
import ScrollToTop from "../ScrollToTop";

class India extends React.Component {
  state = {
    indStateWiseData: {},
    NewsData: []
  };

  componentDidMount() {
    this.getData();
    this.confirmedCaseschart();
    //this.activeCaseschart();
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

    //console.log("India.js -> Updated", this.state.updated);
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
    /*
    await axios.get("https://api.covid19india.org/data.json").then(response => {
      this.setState({ timeSeries: response.data });
    });
*/
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

  formatNumber = n => {
    if (n < 1e3) return n;
    if (n >= 1e3) return +(n / 1e3).toFixed(1) + "K";
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
  confirmedCaseschart = () => {
    let dates = [];
    let confirmedCases = [];
    let activeCases = [];
    let recoveredCases = [];
    let deathCases = [];
    axios
      .get("https://api.covid19india.org/data.json")
      .then(res => {
        //console.log(res.data.cases_time_series);
        const results = res.data.cases_time_series;

        for (const dataObj of results) {
          dates.push(dataObj.date.slice(0, 6));
          confirmedCases.push(dataObj.totalconfirmed);
          recoveredCases.push(dataObj.totalrecovered);
          deathCases.push(dataObj.totaldeceased);
          activeCases.push(
            dataObj.totalconfirmed -
              dataObj.totalrecovered -
              dataObj.totaldeceased
          );
          //console.log("data Obj", dataObj);
        }

        this.setState({
          confirmedChartData: {
            labels: dates,
            datasets: [
              {
                label: "Total Confirmed",
                data: confirmedCases,
                fontSize: 10,
                fontColor: "#0275d8",
                backgroundColor: "#b4dbfd",
                pointBackgroundColor: "#0275d8",
                pointRadius: 2.5,
                pointHoverRadius: 2,
                borderColor: "#0275d8",
                borderWidth: 1
              }
            ]
          },
          activeChartData: {
            labels: dates,
            datasets: [
              {
                label: "Total Active",
                data: activeCases,
                fontSize: 10,
                fontColor: "#d9534f",
                backgroundColor: "#ffe680",
                pointBackgroundColor: "#e6b800",
                pointRadius: 2.5,
                pointHoverRadius: 2,
                borderColor: "#e6b800",
                borderWidth: 1
              }
            ]
          },
          recoveredChartData: {
            labels: dates,
            datasets: [
              {
                label: "Total Recovered",
                data: recoveredCases,
                fontSize: 10,
                fontColor: "#d9534f",
                backgroundColor: "#a6d8a6",
                pointBackgroundColor: "#5cb85c",
                pointRadius: 2.5,
                pointHoverRadius: 2,
                borderColor: "#5cb85c",
                borderWidth: 1
              }
            ]
          },
          deathChartData: {
            labels: dates,
            datasets: [
              {
                label: "Total Deaths",
                data: deathCases,
                fontSize: 10,
                fontColor: "#d9534f",
                backgroundColor: "#ffb3b3",
                pointBackgroundColor: "#d9534f",
                pointRadius: 2.5,
                pointHoverRadius: 2,
                borderColor: "#d9534f",
                borderWidth: 1
              }
            ]
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
    // console.log("Dates", dates);
    // console.log("Confirmed", confirmedCases);
    // console.log("Active", activeCases);
    // console.log("Recovered", recoveredCases);
    // console.log("Deaths", deathCases);
  };
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
    console.log(this.state.indStateWiseData);
    var lastupdated = new Date(this.lastupdate);
    var time = new Date().getHours() - lastupdated.getHours();
    //console.log("NaN ", lastupdated);
    var currTime = new Date();
    var upTime = this.state.updated;
    //console.log("cur ", currTime, "updated ", lastupdated, "uptime ", upTime);
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
        <ScrollToTop />
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
                              this.formatNumberCommas(this.state.confirmed)
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
                              this.formatNumberCommas(
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
                              this.formatNumberCommas(this.state.recovered)
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
                              this.formatNumberCommas(this.state.deaths)
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
                              (this.state.confirmed / 1369.56).toFixed(0)
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
                            className="col-md-3 col-xs-3 "
                            style={{ fontSize: "90%" }}
                          >
                            State / UT
                          </th>
                          <th
                            scope="col"
                            className="col-md-2 col-xs-2 "
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
                <div className="confirmed-map map">
                  <Line
                    data={this.state.confirmedChartData}
                    options={{
                      responsive: true,
                      title: {
                        text: "Confirmed Cases",
                        display: true,
                        fontColor: "#0275d8",
                        fontSize: 15
                      },
                      legend: {
                        position: "right",
                        display: false,
                        labels: { fontColor: "#000" }
                      },
                      scales: {
                        yAxes: [
                          {
                            position: "right",
                            ticks: {
                              fontColor: "#0275d8",
                              beginAtZero: true,
                              callback: function(label) {
                                if (label < 1e3) return label;
                                if (label >= 1e3)
                                  return +(label / 1e3).toFixed(1) + "k";
                              }
                            },
                            gridLines: { display: true, color: "#b4dbfd" }
                          }
                        ],
                        xAxes: [
                          {
                            barPercentage: 0.2,
                            categoryPercentage: 1.5,
                            ticks: {
                              autoSkip: true,
                              maxRotation: 0,
                              minRotation: 0,
                              fontSize: 10,
                              maxTicksLimit: 10
                            },
                            gridLines: { display: false }
                          }
                        ]
                      }
                    }}
                  />
                </div>
                <div className="active-map map">
                  <Line
                    data={this.state.activeChartData}
                    options={{
                      responsive: true,
                      title: {
                        text: "Active Cases",
                        display: true,
                        fontColor: "#e6b800",
                        fontSize: 15
                      },
                      legend: {
                        position: "right",
                        display: false,
                        labels: { fontColor: "#000" }
                      },
                      scales: {
                        yAxes: [
                          {
                            position: "right",
                            ticks: {
                              fontColor: "#e6b800",
                              beginAtZero: true,
                              callback: function(label) {
                                if (label < 1e3) return label;
                                if (label >= 1e3)
                                  return +(label / 1e3).toFixed(1) + "k";
                              }
                            },
                            gridLines: { display: true, color: "#ffe680" }
                          }
                        ],
                        xAxes: [
                          {
                            barPercentage: 0.2,
                            categoryPercentage: 1.5,
                            ticks: {
                              autoSkip: true,
                              maxRotation: 0,
                              minRotation: 0,
                              fontSize: 10,
                              maxTicksLimit: 10
                            },
                            gridLines: { display: false }
                          }
                        ]
                      }
                    }}
                  />
                </div>
                <div className="recovered-map map">
                  <Line
                    data={this.state.recoveredChartData}
                    options={{
                      responsive: true,
                      title: {
                        text: "Recovered",
                        display: true,
                        fontColor: "#008000",
                        fontSize: 15
                      },
                      legend: {
                        position: "right",
                        display: false,
                        labels: { fontColor: "#000" }
                      },
                      scales: {
                        yAxes: [
                          {
                            position: "right",
                            ticks: {
                              fontColor: "#008000",
                              beginAtZero: true,
                              callback: function(label) {
                                if (label < 1e3) return label;
                                if (label >= 1e3)
                                  return +(label / 1e3).toFixed(1) + "k";
                              }
                            },
                            gridLines: { display: true, color: "#a6d8a6" }
                          }
                        ],
                        xAxes: [
                          {
                            barPercentage: 0.2,
                            categoryPercentage: 1.5,
                            ticks: {
                              autoSkip: true,
                              maxRotation: 0,
                              minRotation: 0,
                              fontSize: 10,
                              maxTicksLimit: 10
                            },
                            gridLines: { display: false }
                          }
                        ]
                      }
                    }}
                  />
                </div>
                <div className="death-map map">
                  <Line
                    data={this.state.deathChartData}
                    options={{
                      responsive: true,
                      title: {
                        text: "Deaths",
                        display: true,
                        fontColor: "#d9534f",
                        fontSize: 15
                      },
                      legend: {
                        position: "right",
                        display: false,
                        labels: { fontColor: "#000" }
                      },
                      scales: {
                        yAxes: [
                          {
                            position: "right",
                            ticks: {
                              fontColor: "#d9534f",
                              beginAtZero: true,
                              callback: function(label) {
                                if (label < 1e3) return label;
                                if (label >= 1e3)
                                  return +(label / 1e3).toFixed(1) + "k";
                              }
                            },
                            gridLines: { display: true, color: "#ffcccc" }
                          }
                        ],
                        xAxes: [
                          {
                            barPercentage: 0.2,
                            categoryPercentage: 1.5,
                            ticks: {
                              autoSkip: true,
                              maxRotation: 0,
                              minRotation: 0,
                              fontSize: 10,
                              maxTicksLimit: 10
                            },
                            gridLines: { display: false }
                          }
                        ]
                      }
                    }}
                  />
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
