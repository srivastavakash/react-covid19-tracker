import React from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Line, Bar, defaults } from "react-chartjs-2";
import SocialMediaButtons from "../components/SocialMediaButtons";
import Flag from "react-world-flags";
import NewsAlert from "../containers/NewsAlert";
import StateRow from "../components/StateRow";
import StateWiseCapacity from "../containers/StateWiseCapacity";
import Links from "../data/Links.json";
import ScrollToTop from "../ScrollToTop";

class India extends React.Component {
  state = {
    confirmed: "",
    active: "",
    recovered: "",
    deaths: "",
    indStateWiseData: {},
    NewsData: [],
    dailyData: [],
    chartType: "total",
    style: {
      border: "2px solid rgb(218, 49, 49)",
      fontWeight: "bold",
      height: "37px"
    }
  };

  componentDidMount() {
    this.getData();
    this.getCaseschart();
  }
  handleChartType = type => {
    this.setState({ chartType: type });
  };

  async getData() {
    const IND = await axios.get("https://covid19.mathdro.id/api/countries/IND");

    await axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        //console.log("statewise",response)
        this.setState({
          indStateWiseData: response.data.data.statewise,
          /* confirmed: response.data.data.total.confirmed,
          recovered: response.data.data.total.recovered,
          deaths: response.data.data.total.deaths,
          */
          updated: formatDistance(
            new Date(),
            new Date(response.data.data.lastRefreshed)
          ),
          isLoaded: true
        });
      });

    await axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then(response => {
        const districts = response.data;
        this.setState({
          districtWise: districts,
          districtsLoaded: true
        });
      });

    this.lastupdate = IND.data.lastUpdate;
    const INDStatesData = this.state.indStateWiseData;
    this.setState({
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
  getCaseschart = () => {
    let dates = [];
    let confirmedCases = [];
    let activeCases = [];
    let recoveredCases = [];
    let deathCases = [];
    let dailyconfirmed = [];
    let dailyrecovered = [];
    let dailydeceased = [];
    let dailyactive = [];
    axios
      .get("https://api.covid19india.org/data.json")
      .then(res => {
        console.log("series", res.data);
        const results = res.data.cases_time_series;
        const statsData = res.data.statewise[0];
        console.log(statsData);

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
          dailyconfirmed.push(dataObj.dailyconfirmed);
          dailyactive.push(
            dataObj.dailyconfirmed -
              dataObj.dailyrecovered -
              dataObj.dailydeceased
          );
          dailyrecovered.push(dataObj.dailyrecovered);
          dailydeceased.push(dataObj.dailydeceased);
        }

        let chartData =
          this.state.chartType === "daily" ? dailyconfirmed : confirmedCases;
        console.log("chart data", chartData);

        this.setState({
          confirmed: statsData.confirmed,
          active: statsData.active,
          recovered: statsData.recovered,
          deaths: statsData.deaths,
          dailyData: results[results.length - 1],
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
          dailyconfirmedChartData: {
            labels: dates,
            datasets: [
              {
                label: "Daily Confirmed",
                data: dailyconfirmed,
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
          dailyActiveChartData: {
            labels: dates,
            datasets: [
              {
                label: "Daily Active",
                data: dailyactive,
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
          dailyRecoveredChartData: {
            labels: dates,
            datasets: [
              {
                label: "Daily Recovered",
                data: dailyrecovered,
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
          },
          dailyDeathChartData: {
            labels: dates,
            datasets: [
              {
                label: "Daily Deaths",
                data: dailydeceased,
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
    console.log("India State ", this.state);

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
        <div className="container-fluid home-component">
          <div className="row text-center india animated animatedFadeInUp fadeInUp">
            <div className="col-md-6">
              <div className="mt-1 panel ind-panel">
                <div
                  className="panel-heading  ind-pnl-1"
                  style={{ backgroundColor: "#d3d8de" }}
                >
                  <div className="row">
                    {" "}
                    <div className="col-md-6">
                      <Flag
                        code={"IN"}
                        style={{
                          height: "25px",
                          width: "20px",
                          marginRight: "10px"
                        }}
                      />
                      <span style={{ fontSize: "120%" }}>COVID-19 cases</span>{" "}
                      in India
                    </div>
                    <div className="col-md-6 update-lbl-ind">
                      <i class="fa fa-bell" />
                      {this.state.updated ? (
                        <p> Updated {this.state.updated} ago</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="panel-body text-info">
                  <div className="status-map">
                    <div className="row">
                      <ul className="ind-stats">
                        <li className="text-primary stats-conf-ind">
                          <i className="far fa-check-circle icon" /> <br />{" "}
                          Confirmed
                          <br />
                          <kbd
                            className="bg-info"
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.isLoaded &&
                            this.state.dailyData.dailyconfirmed
                              ? "[+" +
                                this.formatNumberCommas(
                                  this.state.dailyData.dailyconfirmed
                                ) +
                                "]"
                              : ""}
                          </kbd>
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
                        </li>
                        <li className="text-dark stats-active-ind">
                          <i className="far fa fa-bed icon" /> <br /> Active
                          <br />
                          <br />
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
                        </li>
                        <li className="stats-rec-ind">
                          <i
                            className="fas fa-redo icon"
                            style={{ color: "#5cb85c" }}
                          />{" "}
                          <br />
                          Recovered
                          <br />
                          <kbd
                            className="bg-success"
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.isLoaded
                              ? "[+" +
                                this.formatNumberCommas(
                                  this.state.dailyData.dailyrecovered
                                ) +
                                "]"
                              : ""}
                          </kbd>
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
                          {/*<p style={{fontSize:'12px'}}>
                            {this.state.isLoaded
                              ? "[+" + this.state.dailyData.dailyrecovered+"]"
                              : ""}
                          </p>
                            */}
                        </li>
                        <li className="text-danger stats-dec-ind">
                          <i
                            className="fas fa-ambulance icon"
                            style={{ color: "red" }}
                          />{" "}
                          <br />
                          Deaths
                          <br />
                          <kbd
                            className="bg-danger"
                            style={{ fontWeight: "bold" }}
                          >
                            {this.state.isLoaded
                              ? "[+" +
                                this.formatNumberCommas(
                                  this.state.dailyData.dailydeceased
                                ) +
                                "]"
                              : ""}
                          </kbd>
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
                        </li>
                      </ul>
                    </div>
                    <p className="update-lbl-ind-1">
                      <i class="fa fa-bell" />
                      {this.state.updated ? (
                        <p> Updated {this.state.updated} ago</p>
                      ) : (
                        ""
                      )}
                    </p>
                    <div className="row">
                      <ul className="ind-stats">
                        <li className="ind-permillion">
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
                        <li className="text-danger stats-dec-ind">
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
                  className="panel-heading help-head"
                  style={{ backgroundColor: "#d3d8de" }}
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
                  COVID-19 helpline numbers India
                </div>
                <div className="panel-body ind-pnl-body text-info">
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
                <div className="row">
                  <div className="col-md-10 col-sm-7 col-xs-10">
                    <SocialMediaButtons
                      url="https://trackercovid19.in/"
                      text="Track novel coronavirus Cases in India and Rest of the World : www.trackercovid19.in"
                    />
                    <div className="adv">
                      <iframe
                        class="link-src"
                        title="link"
                        src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B07QC5YT69&asins=B07QC5YT69&linkId=dd7b5bc331b21ef0973860f4497d96a3&show_border=true&link_opens_in_new_window=true"
                      />{" "}
                      <iframe
                        class="link-src"
                        title="link"
                        src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B07HGJJ58K&asins=B07HGJJ58K&linkId=103f0f4da2ed824f68e4daa46b4763ae&show_border=true&link_opens_in_new_window=true"
                      />
                    </div>
                  </div>
                </div>
                <p className="trending-lbl">
                  {" "}
                  COMPILED FROM STATE GOVT. DATA <br />
                </p>
                <div className="row state-table-container">
                  <div className="table-responsive st-tab">
                    <table
                      className="table table-fixed table-hover table-striped table-bordered state-table"
                      id="state-table"
                    >
                      <thead className="thead-dark state-head">
                        <tr>
                          <th scope="col">State / UT</th>
                          <th scope="col">Confirmed</th>
                          <th scope="col">Recovered</th>
                          <th scope="col">Deaths</th>
                          <th scope="col">Active</th>
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
                <div className="container text-center switch-chart-type">
                  <p
                    className="alert-danger"
                    onClick={() => {
                      this.handleChartType("total");
                    }}
                    style={
                      this.state.chartType === "total"
                        ? this.state.style
                        : { marginBottom: "10px" }
                    }
                  >
                    <i
                      className="fa fa-dot-circle-o"
                      style={{ fontSize: "15px", color: "red" }}
                    />
                    Total Cases
                  </p>
                  <p
                    className="alert-danger"
                    onClick={() => this.handleChartType("daily")}
                    style={
                      this.state.chartType === "daily" ? this.state.style : null
                    }
                  >
                    <i
                      className="fa fa-dot-circle-o"
                      style={{ fontSize: "15px", color: "red" }}
                    />
                    Daily Cases
                  </p>
                </div>
                <div className="confirmed-map map">
                  {this.state.chartType === "total" ? (
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
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  ) : (
                    <Bar
                      data={this.state.dailyconfirmedChartData}
                      options={{
                        responsive: true,
                        title: {
                          text: "Daily Confirmed",
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
                              barPercentage: 1.5,
                              categoryPercentage: 0.5,
                              ticks: {
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation: 0,
                                fontSize: 10,
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  )}
                </div>
                <div className="active-map map">
                  {this.state.chartType === "total" ? (
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
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  ) : (
                    <Bar
                      data={this.state.dailyActiveChartData}
                      options={{
                        responsive: true,
                        title: {
                          text: "Daily Active",
                          display: true,
                          fontColor: "#e6b800",
                          fontSize: 15
                        },
                        tooltips: {
                          mode: "index"
                        },
                        legend: {
                          position: "left",
                          display: false,
                          reverse: true,
                          labels: {
                            usePointStyle: true, // Required to change pointstyle to 'rectRounded' from 'circle'
                            generateLabels: chart => {
                              const labels = defaults.global.legend.labels.generateLabels(
                                chart
                              );
                              labels.forEach(label => {
                                label.pointStyle = "rectRounded";
                              });
                              return labels;
                            }
                          }
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
                              barPercentage: 2,
                              categoryPercentage: 0.5,
                              ticks: {
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation: 0,
                                fontSize: 10,
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  )}
                </div>
                <div className="recovered-map map">
                  {this.state.chartType === "total" ? (
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
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  ) : (
                    <Bar
                      data={this.state.dailyRecoveredChartData}
                      options={{
                        responsive: true,
                        title: {
                          text: "Daily Recovered",
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
                              barPercentage: 2,
                              categoryPercentage: 0.5,
                              ticks: {
                                autoSkip: true,
                                maxRotation: 0,
                                minRotation: 0,
                                fontSize: 10,
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  )}
                </div>
                <div className="death-map map">
                  {this.state.chartType === "total" ? (
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
                                maxTicksLimit: 8
                              },
                              gridLines: { display: false }
                            }
                          ]
                        }
                      }}
                    />
                  ) : (
                    <Bar
                      data={this.state.dailyDeathChartData}
                      options={{
                        responsive: true,
                        title: {
                          text: "Daily Deaths",
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
                              barPercentage: 2,
                              categoryPercentage: 0.5,
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
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="ml-2 news-section">
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
