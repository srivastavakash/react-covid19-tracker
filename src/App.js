import React, { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Sources from "./data/Sources";
import { Route } from "react-router-dom";
import ReactGA from "react-ga";
import StatePage from "./containers/StatePage";
import "./styles.css";
import "./TableStyle.css";

export default function App() {
  useEffect(() => {
    ReactGA.initialize("UA-166351698-1"); //UA-166351698-1
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="App">
      <Header />
      <Route path="/data-sources-api" exact component={Sources} />
      <Route path="/about" component={Sources} />
      <Route path="/country/IN/state-UT/:sName" component={StatePage} />
      <Footer />
    </div>
  );
}
