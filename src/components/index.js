import React from "react";
import { connect } from "react-redux";
import Table from "./Table/index";
import Map from "./Map/index";
import { BrowserRouter as Router, Route } from "react-router-dom";

class index extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/" render={() => <Table />} />
          <Route exact path="/map" render={() => <Map />} />
        </div>
      </Router>
    );
  }
}

export default index;
