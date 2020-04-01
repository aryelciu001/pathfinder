import React, { Component } from "react";

import "./index.css";

class Tile extends Component {
  onHoverAndDown = e => {
    this.props.onTileClick(e);
  };

  render() {
    const { stat } = this.props.state;
    var classes = "tile ";
    if (stat === "start") {
      classes = classes + "start-tile ";
    } else if (stat === "finish") {
      classes = classes + "finish-tile ";
    } else if (stat === "wall") {
      classes = classes + "wall-tile ";
    } else if (stat === "route") {
      classes = classes + "route-tile ";
    }
    return (
      <div
        className={classes}
        onClick={this.onHoverAndDown}
        onMouseDown={this.onHoverAndDown}
        onMouseOver={this.props.down ? this.onHoverAndDown : () => {}}
      ></div>
    );
  }
}

export default Tile;
