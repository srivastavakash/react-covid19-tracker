import axios from "axios";

export default class GlobalData {
  static async getGlobalData(cb) {
    await axios
      .get("https://api.coronatracker.com/v3/stats/worldometer/global")
      .then(response => {
        cb(response);
        // console.log(response);
      })
      .catch(error => {
        throw error;
      });
  }

  static async getGlobalCountryData(cb) {
    await axios
      .get("https://api.coronatracker.com/v3/stats/worldometer/country")
      .then(response => {
        cb(response.data);
        // console.log("codes ", response.data.countryCode);
      })
      .catch(error => {
        throw error;
      });
  }
}
