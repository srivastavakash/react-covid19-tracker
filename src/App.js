import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route } from "react-router-dom";
import Sources from "./data/About";
import StatePage from "./containers/StatePage";
import "./styles.css";
import "./TableStyle.css";

export default function App() {
  return (
    <div className="App">
      <Header />
      <Route
        path="/country/IN/state-UT/:sName"
        render={props => <StatePage {...props} isAuthed={true} />}
      />
    <Route path="/data-sources-api" component={Sources} />
    <Route path="/about" component={Sources} />
      <Footer />
    </div>
  ); //1800120820050
}
