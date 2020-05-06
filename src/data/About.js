import React, { useState, useEffect } from "react";
import Source from "../data/Links.json";

const Sources = () => {
  /*const [IndSources, setIndSources] = useState({});
  getIndSources=()=>{
  }
}*/

  const IndSources = Source.Source.map((src, index) => (
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
      <div class="container sources-container">
        <h4 className="dt-head">
          {" "}
          <br />
          Data Sources
        </h4>
        <div class="panel">
          <div class="panel-heading ind-src">India</div>
          <div class="panel-body">
            <div className="table-responsive" style={{ width: "100%" }}>
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
          </div>
        </div>
        <div class="panel">
          <div class="panel-heading w-src">World</div>
          <div class="panel-body">Panel Content</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sources;
