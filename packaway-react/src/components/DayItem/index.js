import React from "react";
import POIListItem from "../POIListItem";

import "./index.scss"

export default function DayItem(props) {
  const {day} = props
  console.log("props",props)

  return (
    <div className="day-item">
      <h3 className="day-title">Day {day}</h3>
      <div className="day-content">
        {/* <POIListItem />  que tenga una property que le indique el día dentro del que está*/}
      </div>
    </div>
  );
}

