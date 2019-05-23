import React from "react";

import "./index.scss";

function FinalPOI(props) {
  return (
    <div className="final-poi-container">
        <div>{props.poiName}</div>
    </div>
  );
}

export default FinalPOI;
