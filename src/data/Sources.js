import React, { useState, useEffect } from "react";
import ScrollToTop from "../ScrollToTop";
import { Source, World } from "../data/Links.json";

const Sources = () => {
  /*const [IndSources, setIndSources] = useState({});
  getIndSources=()=>{
  }
}*/

  const IndSources = Source.map((src, index) => (
    <tr key={index}>
      <td className="src-title">{src.Title}</td>
      <td>
        {" "}
        <a href={src.Source_Link} target="_blank" rel="noopener noreferrer">
          <p className="src-link"> {src.Source_Link}</p>
        </a>
      </td>
    </tr>
  ));

  const WorldSources = World.map((src, index) => (
    <tr key={index}>
      <td className="src-title">{src.Title}</td>
      <td>
        {" "}
        <a href={src.Source_Link} target="_blank" rel="noopener noreferrer">
          <p className="src-link"> {src.Source_Link}</p>
        </a>
      </td>
    </tr>
  ));

  return (
    <React.Fragment>
      <ScrollToTop />
      <div class="container sources-container">
        <div className="jumbotron">
          <h3> COVID-19 Tracker</h3>
          <p style={{ fontSize: "13px" }}>
            {" "}
            Track novel coronavirus Cases in India and Rest of the World
          </p>
          <p style={{ fontSize: "15px", fontWeight: "bold" }}>
            <a
              href="https://github.com/srivastavakash"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1e6bb8", textDecoration: "underline" }}
            >
              trackercovid19.in
            </a>{" "}
            is maintained by{" "}
            <a
              href="https://github.com/srivastavakash"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1e6bb8", textDecoration: "underline" }}
            >
              @srivastavakash
            </a>{" "}
          </p>
        </div>
        <h4>
          <i style={{ fontSize: "24px", marginRight: "10px" }} className="fas">
            &#xf772;
          </i>
          Objective{" "}
        </h4>
        <ul className="objective-list">
          <li>Learning ReactJS</li>
          <li>Learning about working of APIs in real-time </li>
          <li>Creating own custom REST API</li>
          <li>Enhance Practical Knowledge</li>
        </ul>
        <h4>
          Built with{" "}
          <a
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#000", textDecoration: "underline" }}
          >
            ReactJS
          </a>
        </h4>
        <br />
        <h5 style={{ marginLeft: "7%", textAlign: "left" }}>Also Used</h5>
        <ul className="objective-list">
          <li>
            <a
              href="https://getbootstrap.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bootstrap
            </a>{" "}
            to make web page responsive and look better
          </li>
          <li>
            {" "}
            <a
              href="https://www.chartjs.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chart.js
            </a>{" "}
            JavaScript library to make the graphs
          </li>
          <li>
            Hosted on{" "}
            <a
              href="https://www.netlify.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Netlify
            </a>
          </li>
        </ul>
        <h4 className="dt-head" id="data-sources">
          {" "}
          <br />
          <i style={{ fontSize: "24px", marginRight: "10px" }} className="far">
            &#xf15c;
          </i>
          Data Sources
        </h4>
        <div class="panel">
          <div class="panel-heading ind-src">India</div>
          <div class="panel-body">
            <div
              className="table-responsive src-tab"
              style={{ width: "100%", padding: "10px" }}
            >
              <table className="table table-bordered">
                <thead className="link-thead">
                  <tr>
                    <th>Data</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>{IndSources}</tbody>
              </table>
            </div>
            <p style={{ textAlign: "justify", marginLeft: "5%" }}>
              Thanks to{" "}
              <a
                href="https://www.covid19india.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                @covid19india .
              </a>{" "}
              This group of volunteers is working hard to gather COVID-19 cases
              data and other information from central and state government
              official websites. They are doing a great job.
              <br />
              <a
                href="https://api.covid19india.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Click here
              </a>{" "}
              to check the list of all their APIs.
            </p>
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading w-src">World</div>
          <div class="panel-body">
            <div className="table-responsive src-tab" style={{ width: "100%" }}>
              <table className="table table-bordered">
                <thead className="link-thead">
                  <tr>
                    <th>Data</th>
                    <th>URL</th>
                  </tr>
                </thead>
                <tbody>{WorldSources}</tbody>
              </table>
            </div>
            <p style={{ textAlign: "justify", marginLeft: "5%" }}>
              Thanks to{" "}
              <a
                href="https://www.coronatracker.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                @CoronaTracker .
              </a>{" "}
              Thanks to for compiling the COVID-19 cases data of all the
              countries.
              <br />
              <a
                href="https://api.coronatracker.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
              >
                Click here
              </a>{" "}
              to check the list of all their APIs.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sources;
