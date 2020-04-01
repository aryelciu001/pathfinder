import React, { Component } from "react";
import "./App.css";

import Map from "./Components/Map";
import Button from "./Components/Button";
import Select from "./Components/Select";

const algoList = ["Dijkstra's Algorithm"];

class App extends Component {
  state = {
    algo: ""
  };

  changeAlgo = e => {
    this.setState({ ...this.state, algo: e.target.value });
  };

  render() {
    return (
      <div className="App">
        <Select options={algoList} onChange={this.changeAlgo}></Select>
        <Map algo={this.state.algo}></Map>
        <div className="legends">
          <div className="legend">
            <div className="tile start-tile"></div>
            <p>
              Start (hold <strong>alt</strong> and{" "}
              <strong>left-mouse-click</strong> to move start tile)
            </p>
          </div>
          <div className="legend">
            <div className="tile finish-tile"></div>
            <p>
              Finish (hold <strong>shift</strong> and{" "}
              <strong>left-mouse-click</strong> to move finish tile)
            </p>
          </div>
          <div className="legend">
            <div className="tile wall-tile"></div>
            <p>
              Wall (hold <strong>left-mouse-click</strong> to add walls. hold
              <strong> ctrl</strong> and <strong>left-mouse-click</strong> to
              remove walls)
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
