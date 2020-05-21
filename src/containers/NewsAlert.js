import React from "react";
import axios from "axios";
import NewsItem from "../components/NewsItem";

export default class NewsAlert extends React.Component {
  state = {
    news: []
  };

  componentDidMount() {
    this.getNewsFeed();
  }

  async getNewsFeed() {
    await axios
      .get(
        "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=bd3e40a8efdf437da8ddaabd6c744e29"
      )
      .then(response => {
        //console.log("India News ", response);
        this.setState({
          IndNews: response.data
        });
      });

    await axios
      .get("https://api.coronatracker.com/news/trending")
      .then(response => {
        //console.log(response);
        this.setState({
          news: response.data
        });
      });

    //console.log("NewsAlert : ", this.state.news);

    //console.log("Global NewsAlertData : ", this.state.news);

    const newsAlert = this.state.news;
    const IndNewsAlert = this.state.IndNews;
    //console.log("India Newsss ", IndNewsAlert);
    this.setState({
      newsRow: newsAlert.items.map((news, index) => (
        <NewsItem
          key={index}
          img={news.urlToImage}
          url={news.url}
          title={news.title}
          content={news.content}
          description={news.description}
          timeStamp={news.publishedAt}
        />
      )),
      indNewsRow: IndNewsAlert.articles.map((news, index) => (
        <NewsItem
          key={index}
          img={news.urlToImage}
          url={news.url}
          title={news.title}
          content={news.content}
          description={news.description}
          timeStamp={news.publishedAt}
          country="IN"
        />
      ))
    });
  }

  render() {
    //console.log(this.state);
    return (
      <React.Fragment>
        <p className="trending-lbl n-lbl"> Latest Trending Updates </p>
        <ul>
          {this.props.country === "IN"
            ? this.state.indNewsRow
            : this.state.newsRow}
        </ul>
      </React.Fragment>
    );
  }
}
