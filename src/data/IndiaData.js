import axios from "axios";

export default class IndiaData {
  static getIndiaData(cb) {
    axios
      .get("https://covid19.mathdro.id/api/countries/IND")
      .then(response => {
        //cb(response.data);
        cb(
          (IndiaData = {
            confirmed: response.data.confirmed.value,
            recovered: response.data.recovered.value,
            deaths: response.data.deaths.value,
            lastupate: response.data.lastUpdate
          })
        );
        //console.log(response.data.lastUpdate);
      })
      .catch(error => {
        throw error;
      });
  }

  static async getIndStateWiseData(cb) {
    await axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        cb(response.data);
        console.log("IND  State API Response : ", response.data);
      })
      .catch(error => {
        throw error;
      });
  }

  static async getIndImg(cb) {
    await axios
      .get("https://covid19.mathdro.id/api/countries/IND/og")
      .then(response => {
        cb(response.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
