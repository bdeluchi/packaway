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
    const {days} = this.props;
    return (
      <div>
        <div className="days-container">
          <h2 className="edit-page-subtitle">My Days</h2>
          <div className="days-content">
            {days.length === 0 && <div className="days-placeholder">Add some days!</div>}
            {this.createDays()}
          </div>
        </div>
        
      </div>
    );
  }
}

export default withDay(DayPanel);
