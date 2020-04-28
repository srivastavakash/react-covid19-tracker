import React from "react";
import axios from "axios";

class StatePage extends React.Component {
  componentDidMount() {
    this.getStateData();
  }

  async getStateData() {
    await axios
      .get("https://api.covid19india.org/v2/state_district_wise.json")
      .then(response => {
        const districts = response.data;
        this.setState({
          districtWise: districts
        });

        console.log("DistrictWise Data : ", this.state.districtWise);
        var data = this.findStateAndDistricts();
        console.log("data - ", data);
      });
  }

  findStateAndDistricts = () => {
    const stateName = this.props.match.params.sName;
    console.log("searching ", stateName);
    let stData = {};
    var stateData = this.state.districtWise.filter(
      state => state.state === stateName
    );
    //console.log("State : ", state.state, stateName)
    /* if (state.state === stateName) {
        stData = state;
        console.log("found ", stData);
      } else {
        stData = {};
      }
      return stData;
    });
    return stateData;*/
    console.log("stateData ", stateData);
  };
  render() {
    console.log(this.props);
    return (
      <React.Fragment>
        <div className="row state-page">
          <div className="col-md-6">
            StatePage under construction
            <table className="table table-fixed table-hover  table-striped table-bordered country-table">
              <thead className="thead">
                <tr>
                  <th className="col-xs-3 col-md-3">District</th>
                  <th className="col-xs-3 col-md-3">Confirmed</th>
                </tr>
              </thead>
              <tbody>{/*this.state.countryData*/}</tbody>
            </table>
          </div>
          <div className="col-md-6">
            State Name : {this.props.match.params.sName}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default StatePage;
