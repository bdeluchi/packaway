import React, { Component } from "react";
import MyPOIList from "../../components/MyPOIList";
import DayPanel from "../../components/DayPanel";

export default class EditPackPage extends Component {

  render() {
    return (
      <div>
        <h1>Edit Pack</h1>
        <MyPOIList />
        <DayPanel />
      </div>
    );
  }
}

