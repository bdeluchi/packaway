import React, { Component } from "react";
import DataService from "../../services/data";
import withPack from "../../helpers/withPack";
import withDay from "../../helpers/withDay";
import withPOI from "../../helpers/withPOI";
import { withRouter } from "react-router-dom";

import "./index.scss";

class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: this.props.packName,
      savedMessage: false    
    };
  }

  async componentDidUpdate() {
    let { currentPack } = this.props;
    if (!currentPack) {
      const { packId } = this.props.match.params;
      this.props.setCurrentPack(packId);
    }
  }


  handleInputChange = e => {
    const value = e.target.value;
    this.setState({ packName: value });
  };

  handleIncreaseValue = () => {
    let { numberOfDays } = this.props;
    let counter = numberOfDays;
    counter++;
    this.props.addDays({ dayId: counter, pois: {} });
    this.props.updateNumberOfDays(counter);
  };

  handleDecreaseValue = () => {
    let { numberOfDays, days } = this.props;
    let counter = numberOfDays;
    if (numberOfDays !== 0) {
      counter--;
      this.props.updateNumberOfDays(counter);
      this.props.removeLastDay(days);
      const day = days[days.length - 1];
      Object.values(day.pois).forEach(poi =>
        this.props.returnPoiToUnassigned(poi)
      );
    }
  };

  onSaveChanges = e => {
    e.preventDefault();
    const { currentPack } = this.props;
    const { days, unassignedPois } = this.props;
    const { packName } = this.state;
    DataService.updatePackData(currentPack, { packName, unassignedPois, days });
    this.setState({savedMessage: true})
    setTimeout(() => {
      this.setState({savedMessage: false})
    }, 1000);
  };

  render() {
    console.log("rendeeerrr")
    const { packName, savedMessage } = this.state;
    const { numberOfDays, packCity } = this.props;
    return (
      <div className="info-container">
        <h2 className="pack-city-name">{packCity}</h2>
        {packName !== null && (
          <div>
            <form onSubmit={this.onSaveChanges}>
              <div className="edit-page-field">
              <label className="edit-page-label">Name</label>
              <input className="edit-name-input"
                type="text"
                value={packName}
                onChange={this.handleInputChange}
              />
              </div>
              <div className="edit-page-field">
              <label className="edit-page-label">Days</label>
              <div
                className="value-button decrease-btn"
                onClick={this.handleDecreaseValue}
                value="decrease"
              >
                -
              </div>
              <input
                className="number-display"
                type="number"
                name="day-input"
                value={numberOfDays}
                readOnly
              />
              <div
                className="value-button increase-btn"
                onClick={this.handleIncreaseValue}
                value="increase"
              >
                +
              </div>
              </div>
              <button className="edit-page-save-btn">Save</button>
              {savedMessage && <div className="saved-message">SAVED!</div>}
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withPOI(withRouter(withDay(withPack(InfoPanel))));
