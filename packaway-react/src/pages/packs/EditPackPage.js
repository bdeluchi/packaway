import React, { Component } from "react";
import MyPOIList from "../../components/MyPOIList";
import DayPanel from "../../components/DayPanel";

import "./EditPackPage.scss";

export default class EditPackPage extends Component {
  render() {
    return (
      <div className="edit-page-container">
        <h1 className="page-title">Edit Pack</h1>
        <div className="edit-content">
          <MyPOIList />
          <DayPanel />
        </div>
      </div>
    );
  }
}
