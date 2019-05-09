import React from "react";
import POIListItem from "../POIListItem";

function DayItem(props) {

  return (
    <div className="day-container">
      <h3 className="day-title">Day X</h3>
      <div className="day-content">
        {/* <POIListItem />  que tenga una property que le indique el día dentro del que está*/}
      </div>
    </div>
  );
}


export default DayItem
