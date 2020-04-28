import axios from "axios";

export default class PatiemtDB {
  static async getIndiaPateintsData(cb) {
    await axios
      .get("https://api.rootnet.in/covid19-in/unofficial/covid19india.org")
      .then(response => {
        cb(response.data);
        console.log("PatientData API Response", response.data);
      })
      .catch(err => {
        throw err;
      });
  }
}
