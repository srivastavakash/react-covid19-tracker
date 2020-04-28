import React from "react";
import axios from "axios";

export default class StateWiseCapacity extends React.Component {
  state = {
    stateWiseCapacityData: []
  };

  componentDidMount() {
    console.log("Mounted");
    this.getData();
  }
  getData = () => {
    axios
      .get(
        "https://api.steinhq.com/v1/storages/5e732accb88d3d04ae0815ae/StateWiseHealthCapacity"
      )
      .then(response => {
        console.log("response : ", response);
        this.setState({
          stateWiseCapacityData: response
        });
      });
  };

  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        <div className="state-page">
          <h3 style={{ marginTop: "30%" }}>State Wise Capacity</h3>
        </div>
      </React.Fragment>
    );
  }
}
