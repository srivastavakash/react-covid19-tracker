import axios from "axios";
import { formatDistance } from "date-fns";

export default class IndiaData {
  static getIndiaData(cb) {
    axios
      .get(
        "https://api.rootnet.in/covid19-in/unofficial/covid19india.org/statewise"
      )
      .then(response => {
        cb(
          (IndiaData = {
            confirmed: response.data.data.total.confirmed,
            recovered: response.data.data.total.recovered,
            deaths: response.data.data.total.deaths,
            lastupdate: formatDistance(
              new Date(),
              new Date(response.data.data.lastRefreshed)
            ),
            updatetime: response.data.data.lastRefreshed
          })
        );
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
