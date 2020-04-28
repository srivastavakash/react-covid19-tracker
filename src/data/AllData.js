import axios from "axios";

export default class AllData {
  static async getGlobalData(cb) {
    await axios
      .get("https://covid19.mathdro.id/api")
      .then(response => {
        cb(response.data);
        //console.log(response.data);
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
        //console.log(response.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
