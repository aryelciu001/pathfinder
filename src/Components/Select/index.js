import React from "react";

import "./index.css";

export default function(props) {
  return (
    <select onChange={props.onChange} className="select">
      <option disabled selected value="">
        -- Select an algorithm --
      </option>
      {props.options.map(option => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
