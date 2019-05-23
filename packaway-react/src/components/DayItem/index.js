import React from "react";
import POIListItem from "../POIListItem";

import "./index.scss";

export default function DayItem(props) {
  const { dayId, dayData } = props;
  return (
    <div className="day-item">
      <h3 className="day-title">Day {dayId}</h3>
      <div className="day-content">
        {Object.values(dayData.pois).map(poi => (
          <POIListItem key={poi.id} poi={poi} dayId={dayId} />
        ))}
      </div>
    </div>
  );
}
