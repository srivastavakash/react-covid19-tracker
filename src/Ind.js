import React from "react";
import axios from "axios";
import Flag from "react-world-flags";
import NewsAlert from "../containers/NewsAlert";
import StateRow from "../components/StateRow";
import Links from "../data/Links.json";

class India extends React.Component {
  state = {
    indStateWiseData: {}
  };

  componentDidMount() {
    this.setData();
  }

  async setData() {
    const IND = await axios.get("https://covid19.mathdro.id/api/countries/IND");

    await axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        this.setState({
          indStateWiseData: response.data.data.statewise
        });
      });

    //console.log("India.js -> State Data", this.state.indStateWiseData);

    this.indConfirm = IND.data.confirmed.value;
    this.indRecovered = IND.data.recovered.value;
    this.indDeaths = IND.data.deaths.value;
    this.lastupdate = IND.data.lastUpdate;
    const INDStatesData = this.state.indStateWiseData;
    this.setState({
      indData: IND.data,
      confirmed: this.indConfirm,
      recovered: this.indRecovered,
      deaths: this.indDeaths,
      staterow: INDStatesData.map((state, index) => (
        <StateRow
          key={index}
          stateName={state.state}
          confirmed={state.confirmed}
          active={state.active}
          recovered={state.recovered}
          deaths={state.deaths}
        />
      ))
    });
  }

  render() {
    var lastupdate = new Date(this.lastupdate);
    var time = new Date().getHours() - lastupdate.getHours();
    //console.log(this.state);
    var helplineLinks = Links.Links.map((link, index) => (
      <li key={index} className="help-link-item">
        <a href={link.Link} target="_blank" rel="noopener noreferrer">
          {link.Title}
        </a>
      </li>
    ));
    // console.log(Links.Links);
    return (
      <React.Fragment>
        <div className="container-fluid">
          <div className="row text-center india">
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
                  <span className="updateLabel">
                    Last Update About {time} Hour{time > 1 ? "s" : ""} Ago
                    &nbsp;
                    {+"  " +
                      lastupdate.getHours() +
                      ":" +
                      lastupdate.getMinutes() +
                      "   IST"}
                  </span>
                </div>
                <div className="panel-body text-info">
                  <div className="status-map">
                    <div className="row">
                      <div className="col-md-3 stats text-primary">
                        <i className="far fa-check-circle icon" /> <br />{" "}
                        <p>{this.state.confirmed}</p>
                        Confirmed
                      </div>
                      <div className="col-md-3 stats text-warning">
                        <i className="far fa fa-bed icon" /> <br />{" "}
                        <p>
                          {String(
                            this.state.confirmed -
                              this.state.recovered -
                              this.state.deaths
                          )}
                        </p>
                        Active
                      </div>
                      <div className="col-md-3 stats  text-success">
                        <i
                          className="fas fa-redo icon"
                          style={{ color: "#5cb85c" }}
                        />{" "}
                        <br />
                        <p>{this.state.recovered}</p>
                        Recovered
                      </div>
                      <div className="col-md-3 stats  text-danger">
                        <i
                          className="fas fa-ambulance icon"
                          style={{ color: "red" }}
                        />{" "}
                        <br />
                        <p>{this.state.deaths}</p>Deaths
                      </div>
                    </div>
                    <hr className="ind-spr" />
                    <div className="row">
                      <div className="col-md-3 stats">
                        <i className="fas fa-file-medical icon" /> <br />
                        <p>{(this.state.confirmed / 100000).toFixed(2)}</p>
                        Cases per million
                      </div>
                      <div className="col-md-3 stats  text-success">
                        <i
                          className="fas fa-redo icon"
                          style={{ color: "green" }}
                        />{" "}
                        <br />
                        <p>
                          {(
                            (this.state.recovered / this.state.confirmed) *
                            100
                          ).toFixed(2) + " %"}
                        </p>
                        Recovery Rate
                      </div>
                      <div className="col-md-3 stats  text-danger">
                        <i
                          className="	fas fa-notes-medical icon"
                          style={{ color: "red" }}
                        />{" "}
                        <br />
                        <p>
                          {(
                            (this.state.deaths / this.state.confirmed) *
                            100
                          ).toFixed(2) + " %"}
                        </p>
                        Fatality Rate
                      </div>

                      <div className="col-md-3 stats  text-danger">
                        <i
                          className="fas fa-ambulance icon"
                          style={{ color: "red" }}
                        />{" "}
                        <br />
                        <p>
                          {(
                            (this.state.deaths / this.state.confirmed) *
                            100
                          ).toFixed(2) + " %"}
                        </p>
                        Fatality Rate
                      </div>
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
                  <marquee behavior="alternate">
                    <ul className="help-links">{helplineLinks}</ul>
                  </marquee>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="trending-lbl"> COMPILED FROM STATE GOVT. DATA</p>
                <div className="row state-table-container">
                  <div className=" table-responsive">
                    <table className="table table-fixed table-hover table-striped table-bordered state-table">
                      <thead className="thead-dark state-head">
                        <tr>
                          <th scope="col" className="col-4 ">
                            State / UT
                          </th>
                          <th scope="col" className="col-2 ">
                            Confirmed
                          </th>
                          <th scope="col" className="col-2 ">
                            Recovered
                          </th>
                          <th scope="col" className="col-2 ">
                            Deaths
                          </th>
                          <th scope="col" className="col-2 ">
                            Active
                          </th>
                        </tr>
                      </thead>
                      <tbody>{this.state.staterow}</tbody>
                    </table>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="news-section">
                  <NewsAlert news={this.state.newsFeed} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default India;
