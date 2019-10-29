import React from "react";
import "./App.css";
import Component from "./components/index";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Component />
        </Router>
      </Provider>
    );
  }
}

export default App;
