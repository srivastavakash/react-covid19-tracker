import React from "react";

export default function Footer() {
  return (
    <React.Fragment>
      <div className="row footer-row">
        <div className="col-md-4">
          <br />
          <br />
          <ul className="footer-list">
            <li>Helpful links</li>
            <li>Data Source</li>
            <li>API</li>
            <li>
              Fork me on Github
              <br />
              <br />
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <br />
          <br />
          <ul className="footer-list">
            <li>COVID-19</li>
            <li>Prevention</li>
            <li>
              <a
                href="https://coronavirus.thebaselab.com/"
                className="f-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Map
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/919013151515?text=Hi"
                className="f-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                MyGOv WhatsApp
                <img
                  src="https://seeklogo.com/images/W/whatsapp-icon-logo-BDC0A8063B-seeklogo.com.png"
                  alt="whatsapp_logo"
                  style={{ height: "15px", width: "15px" }}
                />{" "}
              </a>
              <br />
              <br />
            </li>
          </ul>
        </div>
        <div className="col-md-4">
          <br />
          <br />
          <ul className="footer-list">
            <li>
              <a
                href="https://www.who.int/"
                target="_blank"
                rel="noopener noreferrer"
                className="f-link"
              >
                WHO
              </a>
            </li>
            <li>
              {" "}
              <a
                href="https://www.mohfw.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="f-link"
              >
                Ministry of Health & Family Welfare
              </a>
            </li>
            <li>
              <a
                href="https://covid.icmr.org.in/index.php/testing-facilities#23.5627026/79.9038088/5"
                className="f-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                Testing Labs in India
              </a>
            </li>
            <li />
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
}
