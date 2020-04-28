import React from "react";
import axios from "axios";
import { Route, NavLink } from "react-router-dom";
import Flag from "react-world-flags";
import GlobalData from "../data/GlobalData";
import IndiaData from "../data/IndiaData";
import India from "./India";
import NewsAlert from "./NewsAlert";

export default class Home extends React.Component {
  state = {
    confirmed: "",
    recovered: "",
    deaths: "",
    globalnewCases: "",
    globalnewDeaths: "",
    globalActive: "",
    globalCasesPerMillion: "",
    countries: [],
    indiaData: [],
    newsFeed: [],
    countryCodes: []
  };

  componentDidMount() {
    this.getData();
  }

  async getData() {
    this.globalStats = {
      confirmed: "",
      recovered: "",
      deaths: ""
    };
    this.countryData = {};
    this.indiaData = {};

    const IND = await axios.get("https://covid19.mathdro.id/api/countries/IND");
    this.lastupdate = IND.data.lastUpdate;

    GlobalData.getGlobalData(data =>
      this.setState({
        confirmed: data.data.totalConfirmed,
        recovered: data.data.totalRecovered,
        deaths: data.data.totalDeaths,
        globalnewCases: data.data.totalNewCases,
        globalnewDeaths: data.data.totalNewDeaths,
        globalActive: data.data.totalActiveCases,
        globalCasesPerMillion: data.data.totalCasesPerMillionPop
      })
    );

    GlobalData.getGlobalCountryData(data => {
      const countryWise = data;
      this.setState({
        countries: countryWise,
        countryDataLoaded: true,
        countryData: countryWise.map((country, index) => (
          //  console.log("code : ", country.country, " : ", country.countryCode),
          <tr key={index}>
            <td className="country-name col-xs-4 col-md-4">
              {
                <Flag
                  code={
                    country.country === "Germany"
                      ? "DE"
                      : country.country === "Spain"
                      ? "ES"
                      : country.country === "UK"
                      ? "GB"
                      : country.country === "Turkey"
                      ? "TR"
                      : country.country === "Switzerland"
                      ? "CH"
                      : country.country === "China"
                      ? "CN"
                      : country.country === "Pakistan"
                      ? "PK"
                      : country.country === "Portugal"
                      ? "PT"
                      : country.country === "S. Korea"
                      ? "KR"
                      : country.country === "Sweden"
                      ? "SE"
                      : country.country === "Poland"
                      ? "PL"
                      : country.country === "Denmark"
                      ? "DK"
                      : country.country === "Japan"
                      ? "JP"
                      : country.country === "Indonesia"
                      ? "ID"
                      : country.country === "UAE"
                      ? "AE"
                      : country.country === "Ukraine"
                      ? "UA"
                      : country.country === "Netherlands"
                      ? "NL"
                      : country.country === "Malaysia"
                      ? "MY"
                      : country.country === "Hong Kong"
                      ? "HK"
                      : country.country === "Austria"
                      ? "AT"
                      : country.country === "Ireland"
                      ? "IE"
                      : country.country.slice(0, 2)
                  }
                  className="flag"
                />
              }
              {country.country}
            </td>
            <td className="col-xs-3 col-md-3"> {country.totalConfirmed}</td>
            <td className="col-xs-3 col-md-3"> {country.totalRecovered}</td>
            <td className="col-xs-2 col-md-2"> {country.totalDeaths}</td>
          </tr>
        ))
      });
      const countryCodes = this.state.countryCodes;
      for (let i = 0; i < this.state.countries.length; i++) {
        countryCodes.push(this.state.countries[i].countryCode);
      }
      this.setState({
        countryCodes
      });
    });

    IndiaData.getIndiaData(data =>
      this.setState({
        indiaData: data
      })
    );
  }
  render() {
    var lastUpdateTime = new Date(this.lastupdate);
    var currTime = new Date().getHours();
    var uptime =
      currTime > lastUpdateTime.getHours()
        ? currTime - lastUpdateTime.getHours()
        : lastUpdateTime.getHours() - currTime;
    var time = currTime - lastUpdateTime.getHours();
    // console.log("Time : ", uptime);
    //console.log(" Rendering country Codes : ", this.state.countryCodes);

    return (
      <React.Fragment>
        <div className="container home-component">
          <h3 className="text-danger loading-label">
            {this.state.confirmed === "" ? (
              <div className="progress">
                <div
                  className="progress-bar bg-warning progress-bar-striped progress-bar-animated"
                  style={{ width: "40%" }}
                />
                <p style={{ fontSize: "20px" }}>Loading</p>
              </div>
            ) : (
              ""
            )}
          </h3>
          <div className="row main">
            <div className="col-md-6">
              <div className="row global-data animated animatedFadeInUp fadeInUp">
                <div className="col-md-3">
                  <div className="panel panel-primary">
                    <div className="panel-heading">
                      Global Stats
                      <p>Till Date</p>
                    </div>
                    <div className="panel-body">
                      {" "}
                      {this.state.confirmed !== "" ? (
                        <i className="fas fa-globe" />
                      ) : (
                        ""
                      )}
                      <br />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-info">
                    <div className="panel-heading">
                      Confirmed
                      <br />
                      <kbd className="bg-info" style={{ fontWeight: "bold" }}>
                        + {this.state.globalnewCases} New
                      </kbd>
                    </div>
                    <div className="panel-body text-info">
                      <p className="data">{this.state.confirmed}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-success">
                    <div className="panel-heading">
                      Recovered
                      <br />
                      <kbd
                        className="bg-success"
                        style={{ fontWeight: "bolder" }}
                      >
                        Till Date
                      </kbd>
                    </div>
                    <div className="panel-body text-success">
                      <p className="data">{this.state.recovered}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-danger">
                    <div className="panel-heading">
                      Deaths <br />
                      <kbd
                        className="bg-danger"
                        style={{ fontWeight: "bolder" }}
                      >
                        + {this.state.globalnewDeaths} New
                      </kbd>
                    </div>
                    <div className="panel-body text-danger">
                      <p className="data"> {this.state.deaths}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <span
                    style={{
                      color: "red",
                      textTransform: "uppercase",
                      fontWeight: "bold"
                    }}
                    className="animated
                    animatedFadeInUp
                    fadeInUp"
                  >
                    Last Update About {time} Hour{time > 1 ? "s" : ""} Ago
                    &nbsp;
                    {+"  " +
                      lastUpdateTime.getHours() +
                      ":" +
                      lastUpdateTime.getMinutes() +
                      "   IST"}
                  </span>
                  <div className="panel ind-panel animated animatedFadeInUp fadeInUp">
                    <div
                      className="panel-heading ind-pnl-head"
                      style={{
                        backgroundColor: " rgb(235, 219, 219)"
                      }}
                    >
                      <Flag
                        code="IN"
                        style={{
                          height: "20px",
                          width: "20px",
                          marginRight: "10px"
                        }}
                      />
                      India Overview
                    </div>
                    <div className="panel-body text-info">
                      <div className="status-map">
                        <ul className="progressbar">
                          <li className="text-primary">
                            <i className="far fa-check-circle icon" /> <br />{" "}
                            Confirmed
                            <p>{this.state.indiaData.confirmed}</p>
                          </li>
                          <li className="text-success">
                            <i
                              className="fas fa-redo icon"
                              style={{ color: "#5cb85c" }}
                            />{" "}
                            <br /> Recovered{" "}
                            <p> {this.state.indiaData.recovered} </p>
                          </li>
                          <li className="text-danger">
                            <i
                              className="fas fa-ambulance icon"
                              style={{ color: "red" }}
                            />{" "}
                            <br /> Deaths
                            <p> {this.state.indiaData.deaths} </p>
                          </li>
                        </ul>
                        <NavLink
                          to="/country/IN"
                          style={{
                            textDecoration: "underline",
                            color: "#000",
                            fontWeight: "bold"
                          }}
                          className="ind-link "
                        >
                          More details
                        </NavLink>

                        <Route path="/country/IN" component={India} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <h4 className="text-danger font-weight-bold">
                    <br />
                    COUNTRIES AFFECTED
                    <br />
                  </h4>
                  <div className="table-responsive">
                    <table className="table table-fixed table-hover table-striped table-bordered country-table">
                      <thead className="thead">
                        <tr>
                          <th className="col-xs-4 col-md-4">Country</th>
                          <th className="col-xs-3 col-md-3">Confirmed</th>
                          <th className="col-xs-3 col-md-3">Recovered</th>
                          <th className="col-xs-2 col-md-2">Deaths</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.countryDataLoaded ? (
                          this.state.countryData
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
            </div>
            <div className="col-md-6">
              <p className="source-para">
                Source: WHO, CDC, ECDC, NHC of the PRC, JHU CSSE, DXY, QQ, and
                various international media
              </p>

              <div className="news-section animated animatedFadeInUp fadeInUp">
                <NewsAlert />
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
