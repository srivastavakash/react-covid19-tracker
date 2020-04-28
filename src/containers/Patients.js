import React from "react";
//simport PatientDB from "../data/PatientDB";
import axios from "axios";
export default class Patients extends React.Component {
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

  setSearchQuery = event => {
    const pId = event.target.value;
    console.log("Pid : ", pId);
    var target = this.searchPatient(pId);
    this.setState({ patient: this.searchPatient(pId) });
    console.log("target : ", target);
  };

  searchPatient = pId => {
    console.log("searching id : ", pId);
    return this.patients.filter(
      patient => patient.patientId === parseInt(10, pId)
    );
  };

  render() {
    console.log("state sId :", this.state.searchId);
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
                      type="text"
                      className="form-control"
                      placeholder="Type Patient Number to Search ex- P1,P2"
                      onChange={
                        /*event => {
                    this.setState({ searchId: event.target.value });
                  }*/
                        this.setSearchQuery
                      }
                      style={{ fontWeight: "bold", border: "none" }}
                    />
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-warning btn-search form-control font-weight-bold">
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
                      Patient ID : P{this.state.searchId + "-"}
                      {this.state.patient.patientId}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Status : Recovered
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Gender : Female
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Age : 20
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      State : Kerala
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      District : Thrissur
                    </p>
                  </div>
                </div>
                <div className="row pat-data ">
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Reported On : 25/03/2020
                    </p>
                  </div>
                  <div className="col-md-6">
                    <p className="pat-data-holder form-control bg-light text-dark font-weight-bold">
                      Student from Wuhan
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
