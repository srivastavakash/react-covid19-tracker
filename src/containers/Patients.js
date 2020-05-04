import React from "react";
//simport PatientDB from "../data/PatientDB";
import axios from "axios";

export default class Patients extends React.Component {
  constructor() {
    super();
    this.inputRef = React.createRef();
  }

  state = {
    patientsData: "",
    searchId: "",
    patient: {}
  };

  componentDidMount() {
    this.getPatientData();
  }

  async getPatientData() {
    await axios
      .get("https://api.rootnet.in/covid19-in/unofficial/covid19india.org")
      .then(response => {
        this.setState({
          patientsData: response.data.data
        });
      });
    this.patients = this.state.patientsData.rawPatientData;
    console.log("State Patients", this.patients);
  }

  setSearchQuery = () => {
    const pId = parseInt(this.inputRef.current.value);
    var target = this.searchPatient(pId);
    this.patient = target;
    this.setState({ patient: this.patient });
    console.log(" this : ", this.patient);
    console.log(" found", this.state.patient);
  };

  searchPatient = pId => {
    //console.log("searching id : ", pId);
    const patient = this.patients.filter(patient => patient.patientId === pId);
    //console.log("patient ", patient);
    return patient;
  };

  render() {
    console.log(" rendering ", this.state.patient);

    return (
      <React.Fragment>
        <h3 className="pat-head">
          Patient DataBase <br /> (Being Implemented. May not work properly now)
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
                      max={this.state.patientsData.length}
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
                        ? this.state.patient[0].patientId
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Status :
                      {this.state.patient[0]
                        ? this.state.patient[0].status
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
                          : this.state.patient[0].gender
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Age :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].ageEstimate === ""
                          ? "Not Available"
                          : this.state.patient[0].ageEstimate
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      State :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].state === ""
                          ? "Not Available"
                          : this.state.patient[0].state
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      District :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].district === ""
                          ? "Not Available"
                          : this.state.patient[0].district
                        : ""}
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Reported On :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].reportedOn === ""
                          ? "Not Available"
                          : this.state.patient[0].reportedOn
                        : ""}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Nationality :{" "}
                      {this.state.patient[0]
                        ? this.state.patient[0].place_attributes &&
                          this.state.patient[0].place_attributes.length > 0
                          ? this.state.patient[0].place_attributes[0].place
                          : "Not Available"
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
