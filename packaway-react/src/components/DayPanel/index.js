import React, { Component } from "react";
import withDay from "../../helpers/withDay";
import DayItem from "../DayItem";

import "./index.scss"

class DayPanel extends Component {
  
  createDays = () => {
    const { numberOfDays, days } = this.props;
    const dayItems = [];
    for (let i = 1; i <= numberOfDays; i++) {
       dayItems.push(<DayItem key={`day${i}`} dayId={i} dayData={days[i-1]}/>);
    }
    return dayItems;
  };

  render() {
    return (
      <div>
        <h2>Manage your days here</h2>
        <div className="days-container">{this.createDays()}</div>
      </div>
    );
  }
}

export default withDay(DayPanel);
