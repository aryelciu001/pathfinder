import React from "react";

import "./index.css";

export default function(props) {
  return (
    <div className="btn" onClick={props.onClick || ""}>
      {props.text || "new text"}
    </div>
  );
}
