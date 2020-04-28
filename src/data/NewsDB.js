import axios from "axios";

export default class NewsDB {
  static getNewsData(cb) {
    axios
      .get("https://api.coronatracker.com/news/trending")
      .then(response => {
        cb(response.data);
        console.log("News API Response", response.data);
      })
      .catch(error => {
        throw error;
      });
  }

  static getIndNews(cb) {
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=bd3e40a8efdf437da8ddaabd6c744e29"
      )
      .then(response => {
        cb(response.data);
        console.log("INDIA News Response", response.data);
      })
      .catch(error => {
        throw error;
      });
  }
}
