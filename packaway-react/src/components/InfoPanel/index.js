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

  // handleNumberChange = e => {
  //   const value = parseInt(e.target.value);
  //   console.log(value);
  // };

  handleIncreaseValue = () => {
    let { numberOfDays } = this.props;
    let counter = numberOfDays;
    counter++;
    this.props.addDays({ dayId: counter, pois: {} });
    this.props.updateNumberOfDays(counter);
  };

  handleDecreaseValue = () => {
    let { numberOfDays } = this.props;
    let counter = numberOfDays;
    if (numberOfDays !== 0) {
      counter--;
      this.props.updateNumberOfDays(counter);
    }
  };

  onSaveChanges = e => {
    e.preventDefault();
    const { currentPack } = this.props;
    const { days, unassignedPois } = this.props;
    const { packName } = this.state;
    DataService.updatePackData(currentPack, { packName, unassignedPois, days });
  };

  render() {
    const { packName} = this.state;
    const {numberOfDays} = this.props
    return (
      <div>
        {packName !== null && (
          <div>
            <form onSubmit={this.onSaveChanges}>
              <input
                type="text"
                value={packName}
                onChange={this.handleInputChange}
              />
              <label>
                Days:
                <div
                  className="value-button decrease-btn"
                  onClick={this.handleDecreaseValue}
                  value="decrease"
                >
                  -
                </div>
                <input className="number-display"
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
              </label>
              <button>Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withPOI(withRouter(withDay(withPack(InfoPanel))));
