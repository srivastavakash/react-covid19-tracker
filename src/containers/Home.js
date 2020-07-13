import React from "react";
import axios from "axios";
import { formatDistance } from "date-fns";
import { Route, NavLink } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import Flag from "react-world-flags";
import SocialMediaButtons from "../components/SocialMediaButtons";
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
    console.log("IND", IND.data.confirmed.value);
    this.setState({
      indiaData: IND.data
    });

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
            <td className="country-name">
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
            <td className="col-xs-3 col-md-3  col-lg-3">
              {" "}
              {this.formatNumberCommas(country.totalConfirmed)}
            </td>
            <td className="col-xs-3 col-md-3  col-lg-3">
              {" "}
              {this.formatNumberCommas(country.totalRecovered)}
            </td>
            <td className="col-xs-2 col-md-2  col-lg-3">
              {" "}
              {this.formatNumberCommas(country.totalDeaths)}
            </td>
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

    /*IndiaData.getIndiaData(data =>
      this.setState({
        indiaData: data
      })
    );*/
  }

  formatNumber(num) {
    num += "";
    var x = num.split(".");
    var x1 = x[0];
    var x2 = x.length > 1 ? "." + x[1] : "";
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, "$1" + "," + "$2");
    }
    return x1 + x2;
  }
  formatNumberCommas(number) {
    var num = parseInt(number);
    num = num.toString();
    var lastThree = num.substring(num.length - 3);
    var otherNumbers = num.substring(0, num.length - 3);
    if (otherNumbers !== "") lastThree = "," + lastThree;
    var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    //document.write(res);
    return res;
  }
  render(props) {
    console.log("Home state", this.state);
    console.log("last updated " + this.state.indiaData.lastupdate + " ago");
    var lastUpdateTime = new Date(this.state.indiaData.lastupdate);
    var currTime = new Date().getHours();
    var curr = new Date();
    //var timeStamp = formatDistance(curr, lastUpdateTime);
    console.log("darkbtn : ", this.props);
    console.log("curtime", curr);
    console.log("updated", lastUpdateTime);
    //console.log("home TimeStamp", timeStamp);
    console.log("Home TimeStamp ", this.state.indiaData.lastupdate);

    return (
      <React.Fragment>
        <ScrollToTop />
        <div className="container-fluid home-component">
          <div className="row main">
            <div className="col-md-6">
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
                    {
                      /*<i
                      class="fas fa-sun"
                      style={{
                        fontSize: "24px",
                        marginRight: "20px",
                        marginLeft: "0px"
                      }}
                    />
                    */
                      this.props.btn
                    }
                    {this.state.indiaData.lastupdate
                      ? "Updated " + this.state.indiaData.lastupdate + " ago"
                      : ""}
                  </span>
                  <div className="panel ind-panel animated animatedFadeInUp fadeInUp">
                    <div
                      className="panel-heading ind-pnl-head"
                      style={{
                        backgroundColor: "#d3d8de"
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
                      <span style={{ fontSize: "120%" }}>
                        Coronavirus cases
                      </span>{" "}
                      in India
                    </div>
                    <div className="panel-body text-info">
                      <div className="status-map">
                        <ul className="progressbar">
                          <li className="text-primary">
                            <i className="far fa-check-circle icon" /> <br />{" "}
                            Confirmed
                            <p>
                              {this.state.indiaData.confirmed ? (
                                this.formatNumberCommas(
                                  this.state.indiaData.confirmed.value
                                )
                              ) : (
                                <i
                                  className="fa fa-spinner fa-spin"
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                  }}
                                />
                              )}
                            </p>
                          </li>
                          <li className="text-success">
                            <i
                              className="fas fa-redo icon"
                              style={{ color: "#5cb85c" }}
                            />{" "}
                            <br /> Recovered{" "}
                            <p>
                              {" "}
                              {this.state.indiaData.recovered ? (
                                this.formatNumberCommas(
                                  this.state.indiaData.recovered.value
                                )
                              ) : (
                                <i
                                  className="fa fa-spinner fa-spin"
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                  }}
                                />
                              )}{" "}
                            </p>
                          </li>
                          <li className="text-danger">
                            <i
                              className="fas fa-ambulance icon"
                              style={{ color: "red" }}
                            />{" "}
                            <br /> Deaths
                            <p>
                              {" "}
                              {this.state.indiaData.deaths ? (
                                this.formatNumberCommas(
                                  this.state.indiaData.deaths.value
                                )
                              ) : (
                                <i
                                  className="fa fa-spinner fa-spin"
                                  style={{
                                    fontSize: "25px",
                                    fontWeight: "bold"
                                  }}
                                />
                              )}{" "}
                            </p>
                          </li>
                        </ul>
                        <NavLink
                          to="/country/IN"
                          style={{
                            textDecoration: "underline",
                            color: "#000",
                            backgroundColor: "#d3d8de",
                            fontWeight: "bold"
                          }}
                          className="ind-link btn "
                        >
                          More details
                        </NavLink>

                        <Route path="/country/IN" component={India} />
                      </div>
                    </div>
                  </div>
                </div>

                <SocialMediaButtons
                  url="https://trackercovid19.in/"
                  text="Track novel coronavirus Cases in India and Rest of the World : www.trackercovid19.in"
                />
              </div>
              <div className="row global-data animated animatedFadeInUp fadeInUp">
                <div className="col-md-3">
                  <div className="panel">
                    <div
                      className="panel-heading g-pnl"
                      style={{
                        backgroundColor: "#d3d8de"
                      }}
                    >
                      <span style={{ fontSize: "120%" }}>
                        Coronavirus cases
                      </span>
                      <br />
                      Worldwide
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-info g-pn">
                    <div className="panel-heading">
                      Confirmed
                      <br />
                    </div>
                    <div className="panel-body text-info">
                      {this.state.confirmed > 0 ? (
                        <div>
                          <p className="data">
                            {this.formatNumberCommas(this.state.confirmed)}
                          </p>
                          <kbd
                            className="bg-info"
                            style={{ fontWeight: "bold" }}
                          >
                            + {this.formatNumber(this.state.globalnewCases)} New
                          </kbd>
                        </div>
                      ) : (
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "25px", fontWeight: "bold" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-success g-pn g-rec">
                    <div className="panel-heading">Recovered</div>
                    <div className="panel-body text-success">
                      {this.state.confirmed > 0 ? (
                        <div>
                          <p className="data">
                            {this.formatNumberCommas(this.state.recovered)}
                          </p>
                        </div>
                      ) : (
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "25px", fontWeight: "bold" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="panel panel-danger g-pn">
                    <div className="panel-heading">Deaths</div>
                    <div className="panel-body text-danger">
                      {this.state.deaths > 0 ? (
                        <div>
                          <p className="data">
                            {this.formatNumberCommas(this.state.deaths)}
                          </p>
                          <kbd
                            className="bg-danger"
                            style={{ fontWeight: "bold" }}
                          >
                            + {this.formatNumber(this.state.globalnewDeaths)}{" "}
                            New
                          </kbd>
                        </div>
                      ) : (
                        <i
                          className="fa fa-spinner fa-spin"
                          style={{ fontSize: "25px", fontWeight: "bold" }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <iframe
                    class="link-src"
                    title="link"
                    src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B086KFXPFD&asins=B086KFXPFD&linkId=f0c048c3b0d4640ce58ecd337ff97f4b&show_border=true&link_opens_in_new_window=true"
                  />{" "}
                  <iframe
                    class="link-src"
                    title="link"
                    src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B01F262EUU&asins=B01F262EUU&linkId=0f8e8fa8f3fcea706edcc03c19d468a7&show_border=true&link_opens_in_new_window=true"
                  />
                  <h4 className="text-danger font-weight-bold">
                    <br />
                    COUNTRIES AFFECTED
                    <br />
                  </h4>
                  <div className="table-responsive">
                    <table
                      className="table table-fixed table-hover table-striped table-bordered country-table"
                      id="country-table"
                    >
                      <thead className="thead">
                        <tr>
                          <th>Country</th>
                          <th>Confirmed</th>
                          <th>Recovered</th>
                          <th>Deaths</th>
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
                  {/*<iframe
                    class="link-src"
                    title="link"
                    src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B07X2K68FZ&asins=B07X2K68FZ&linkId=84809efb2e927deb8ba682c3caf5dd56&show_border=true&link_opens_in_new_window=true"
                  />
                  <iframe
                    class="link-src"
                    title="link"
                    src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B07B92KNZP&asins=B07B92KNZP&linkId=b5063e049486ecb484f7c523a64aef9d&show_border=true&link_opens_in_new_window=true"
                  />*/}
                  <iframe
                    class="link-src"
                    title="link"
                    src="//ws-in.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=IN&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=manojsrivas0c-21&language=en_IN&marketplace=amazon&region=IN&placement=B07YVH7FQZ&asins=B07YVH7FQZ&linkId=c5323c91f419043246c63e0dc64050ea&show_border=true&link_opens_in_new_window=true"
                  />
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
