import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import DayItem from "../DayItem";

import "./index.scss"

class DayPanel extends Component {
  createDays = () => {
    const { numberOfDays } = this.props;
    const dayItems = [];
    for (let i = 1; i <= numberOfDays; i++) {
      dayItems.push(<DayItem key={i} day={i} />);
    }
    return dayItems;
  };

  render() {
    return (
      <div>
        <h2>Manage your packs here</h2>
        <div className="days-container">{this.createDays()}</div>
      </div>
    );
  }
}

export default withPack(DayPanel);
