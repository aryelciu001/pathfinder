import React, { Component } from "react";

import "./index.css";

import Tile from "../Tile";
import Slider from "../Slider";
import Button from "../Button";

import { dijkstraAlgo } from "../../Algorithms";

class Map extends Component {
  state = {
    size: 10,
    map: [],
    reward: -0.04,
    minus: -1,
    plus: 1,
    down: false,
    start: [0, 0],
    finish: [],
    loading: false,
    route: [],
    feedback: ""
  };

  reset = () => {
    this.setState({ ...this.state, map: [], feedback: "" }, () => {
      this.makeMap();
    });
  };

  changeSize = e => {
    var newSize = e.target.value;
    this.setState(
      {
        ...this.state,
        size: newSize,
        map: [],
        feedback: ""
      },
      () => this.makeMap()
    );
  };

  makeMap = () => {
    const { reward, minus, plus, map, size } = this.state;
    if (map.length === 0) {
      //if empty, we make new map
      var newMap = [];
      var row;
      for (let j = 0; j < size; j++) {
        row = [];
        for (let i = 0; i < size; i++) {
          if (i === 0 && j === 0) {
            row.push({
              x: i,
              y: j,
              stat: "start",
              reward,
              minus,
              plus
            });
          } else if (i === size - 1 && j === size - 1) {
            row.push({
              x: i,
              y: j,
              stat: "finish",
              reward,
              minus,
              plus
            });
          } else {
            row.push({
              x: i,
              y: j,
              stat: "tile",
              reward,
              minus,
              plus
            });
          }
        }
        newMap.push(row);
      }
      this.setState({
        ...this.state,
        map: newMap,
        start: [0, 0],
        finish: [size - 1, size - 1]
      });
    }
  };

  onDown = e => {
    e.preventDefault();
    this.setState({ ...this.state, down: true, feedback: "" });
  };

  onUp = e => {
    e.preventDefault();
    this.setState({ ...this.state, down: false, feedback: "" });
  };

  componentDidMount() {
    this.makeMap();
  }

  handleTileClick = (e, x, y) => {
    if (e.ctrlKey) {
      this.deleteWall(x, y);
    } else if (e.altKey) {
      this.makeStart(x, y);
    } else if (e.shiftKey) {
      this.makeFinish(x, y);
    } else {
      this.makeWall(x, y);
    }
  };

  makeWall = (x, y) => {
    var { map } = this.state;
    if (map[y][x].stat === "tile") {
      map[y][x].stat = "wall";
      this.setState({ ...this.state, map, feedback: "" });
    }
  };

  deleteWall = (x, y) => {
    var { map } = this.state;
    if (map[y][x].stat === "wall") {
      map[y][x].stat = "tile";
      this.setState({ ...this.state, map, feedback: "" });
    }
  };

  makeStart = (x, y) => {
    var { map, start } = this.state;
    if (map[y][x].stat === "tile") {
      map[start[1]][start[0]].stat = "tile";
      this.setState({ ...this.state, map }, () => {
        start = [x, y];
        map[y][x].stat = "start";
        this.setState({ ...this.state, start, map, feedback: "" });
      });
    }
  };

  makeFinish = (x, y) => {
    var { map, finish } = this.state;
    if (map[y][x].stat === "tile") {
      map[finish[1]][finish[0]].stat = "tile";
      this.setState({ ...this.state, map }, () => {
        finish = [x, y];
        map[y][x].stat = "finish";
        this.setState({ ...this.state, finish, map, feedback: "" });
      });
    }
  };

  clearRoute = () => {
    const { map, route } = this.state;
    for (let i = 1; i < route.length - 1; i++) {
      var node = route[i];
      map[node[1]][node[0]].stat = "tile";
      this.setState({
        ...this.state,
        map,
        loading: false,
        route: [],
        feedback: ""
      });
    }
  };

  startSearch = () => {
    this.clearRoute();
    this.setState({ ...this.state, loading: true }, () => {
      const { map, start, finish, size } = this.state;
      var route = [];
      var canSearch = true;
      if (this.props.algo === "Dijkstra's Algorithm") {
        var route = dijkstraAlgo(map, start, finish, size);
      } else if (this.props.algo === "") {
        canSearch = false;
        this.setState({
          ...this.state,
          feedback: "Please choose an algorithm.",
          loading: false
        });
      }
      if (canSearch) {
        if (route.length === 0) {
          this.setState({
            ...this.state,
            loading: false,
            feedback: "Path not found!"
          });
        } else if (route.length === 2) {
          this.setState({
            ...this.state,
            loading: false,
            feedback: "Path found!"
          });
        }
        for (let i = 1; i < route.length - 1; i++) {
          var node = route[i];
          map[node[1]][node[0]].stat = "route";
          this.setState({
            ...this.state,
            map,
            loading: false,
            route,
            feedback: "Path found!"
          });
        }
      }
    });
  };

  render() {
    const { map, down, loading, feedback } = this.state;
    return (
      <React.Fragment>
        <Slider
          value={this.state.size}
          onSizeChange={this.changeSize}
          size={this.state.size}
        ></Slider>
        <div
          className="map"
          style={{ minWidth: `${this.state.size * 25}px` }}
          onMouseUp={this.onUp}
          onMouseDown={this.onDown}
          onMouseLeave={this.onUp}
        >
          {map.map((row, index) => {
            return (
              <div className="row" key={index}>
                {row.map(tile => {
                  return (
                    <Tile
                      state={tile}
                      down={down}
                      onTileClick={e => this.handleTileClick(e, tile.x, tile.y)}
                      key={tile.x + tile.y}
                    ></Tile>
                  );
                })}
              </div>
            );
          })}
        </div>
        {loading ? "loading" : ""}
        {feedback}
        <div className="find-btn">
          <Button text={"Find Path"} onClick={this.startSearch}></Button>
          <Button text={"Reset"} onClick={this.reset}></Button>
          <Button text={"Clear Path"} onClick={this.clearRoute}></Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Map;
