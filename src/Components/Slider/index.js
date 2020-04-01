import React from "react";

import "./index.css";

export default function(props) {
  return (
    <div className="slider-container">
      <div className="slider-div">Map Size: {props.size}</div>
      <input
        className="slider"
        type="range"
        value={props.value}
        min="5"
        max="30"
        onChange={props.onSizeChange}
      ></input>
    </div>
  );
}
