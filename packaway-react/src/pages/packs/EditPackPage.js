import React, { Component } from "react";
import MyPOIList from "../../components/MyPOIList";
import DayPanel from "../../components/DayPanel";

import './EditPackPage.scss'

export default class EditPackPage extends Component {

  render() {
    return (
      <div className="edit-page-container">
        <h1 className="edit-title">Edit Pack</h1>
        <MyPOIList />
        <DayPanel />
      </div>
    );
  }
}

