import React from "react";
//simport PatientDB from "../data/PatientDB";
import axios from "axios";

export default class Patients extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  state = {
    patients: [],
    patientsData: "",
    searchId: "",
    patient: {}
  };

  componentDidMount() {
    this.getPatientData();
  }

  async getPatientData() {
    await axios
      .get("https://api.covid19india.org/raw_data1.json")
      .then(response => {
        this.setState({
          patients: response.data.raw_data
        });
        //console.log("res 1 ", response.data);
      });
    await axios
      .get("https://api.covid19india.org/raw_data2.json")
      .then(response => {
        let pats = this.state.patients;
        this.setState({
          patients: pats.concat(response.data.raw_data)
        });

        //console.log("res 2 ", response.data);
      });

    await axios
      .get("https://api.covid19india.org/raw_data3.json")
      .then(response => {
        let pats = this.state.patients;
        this.setState({
          patients: pats.concat(response.data.raw_data)
        });

        //console.log("res 3 ", response.data);
      });
    this.patients = this.state.patients;
    //console.log("Patients", this.patients);
  }

  setSearchQuery = () => {
    const pId = this.inputRef.current.value;
    var target = this.searchPatient(pId);
    this.patient = target;
    this.setState({ patient: this.patient });
    //console.log(" this : ", this.patient);
    console.log(" found", this.state.patient);
  };

  searchPatient = pId => {
    //console.log("searching id : ", pId);
    const patient = this.patients.filter(
      patient => patient.patientnumber === pId
    );
    console.log("patient ", patient);
    return patient;
  };

  render() {
    console.log(" rendering ", this.state.patient, this.state);

    return (
      <React.Fragment>
        <h3 className="pat-head">
          <i style={{ fontSize: "24px" }} className="fas">
            &#xf962; &nbsp; &nbsp;
          </i>
          Search Patients <br />
          <br />
        </h3>
        <div className="row">
          <div className="col-md-3"> </div>
          <div className="col-md-6">
            <div className="panel">
              <div
                className="panel-heading"
                style={{ backgroundColor: "#133e4a", color: "#fff" }}
              >
                <div className="row">
                  <div className="col-md-9 form-group">
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Type Patient Number to Search ex- 1,2,3 "
                      min="1"
                      max={this.state.patients.length}
                      ref={this.inputRef}
                      style={{ fontWeight: "bold", border: "none" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <button
                      className="btn btn-warning btn-search form-control font-weight-bold"
                      onClick={this.setSearchQuery}
                    >
                      Search
                    </button>
                  </div>
                </div>
              </div>
              <hr />
              <div
                className="panel-body"
                style={{ backgroundColor: "#133e4a", color: "#fff" }}
              >
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Patient ID :{"P"}
                      {this.state.patient[0]
                        ? this.state.patient[0].patientnumber
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Status :
                      {this.state.patient[0]
                        ? this.state.patient[0].currentstatus
                          ? this.state.patient[0].currentstatus
                          : "Not Available"
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Gender :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].gender === ""
                          ? "Not Available"
                          : this.state.patient[0].gender === "M"
                          ? "Male"
                          : "Female"
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Age :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].agebracket === ""
                          ? "Not Available"
                          : this.state.patient[0].agebracket
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      State :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].detectedstate === ""
                          ? "Not Available"
                          : this.state.patient[0].detectedstate
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      District :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].detecteddistrict === ""
                          ? "Not Available"
                          : this.state.patient[0].detecteddistrict
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Reported On :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].dateannounced === ""
                          ? "Not Available"
                          : this.state.patient[0].dateannounced
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Nationality :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].nationality === ""
                          ? "Not Available"
                          : this.state.patient[0].nationality
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <textarea
                      className="pat-data-holder form-control bg-light text-dark font-weight-bold"
                      value={
                        this.state.patient[0]
                          ? this.state.patient[0].notes === ""
                            ? "Not Available"
                            : this.state.patient[0].notes
                          : ""
                      }
                    />
                    <br />

                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      {this.state.patient[0]
                        ? this.state.patient[0].backupnotes === ""
                          ? "Not Available"
                          : this.state.patient[0].backupnotes
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3"> </div>
        </div>
        <div className="row">
          <div className="col-md-6"> </div>
          <div className="col-md-6"> </div>
        </div>
      </React.Fragment>
    );
  }
}
