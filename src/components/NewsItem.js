import React from "react";
import { formatDistance } from "date-fns";

export default function NewsItem(props) {
  //console.log("News Item Props ", props);

  var currDate = new Date();
  var updateTime = new Date(props.timeStamp);
  // console.log("date ", currDate, "timeStamp ", updateTime);

  var timeStamp = formatDistance(currDate, updateTime);
  //console.log("minutes ", timeStamp);
  console.log("News ITEM ", props);

  return (
    <li className="news-item card" style={props.style}>
      <div className="row">
        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-4">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            <img
              src={
                props.img ||
                "https://news.mit.edu/sites/mit.edu.newsoffice/files/styles/news_article_image_top_slideshow/public/images/2020/MIT-IE-Roundup-01_0.jpg?itok=waxtmAat"
              }
              className=" img-fluid news-img"
              alt="news-img"
            />
          </a>
        </div>
        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-8 news-container">
          <p className="news-title">
            <a href={props.url} target="_blank" rel="noopener noreferrer">
              {props.title}
            </a>
          </p>
          <p className="news-desc">
            {props.description.slice(0, 180) + "...."}
          </p>
          <p className="news-time">{timeStamp + " ago "}</p>
        </div>
      </div>
    </li>
  );
}
