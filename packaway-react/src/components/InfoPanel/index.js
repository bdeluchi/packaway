import React, { Component } from "react";
import DataService from "../../services/data";
import withPack from "../../helpers/withPack";
import withDay from "../../helpers/withDay";
import withPOI from "../../helpers/withPOI";
import { withRouter } from "react-router-dom";


class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: this.props.packName,
      numberOfDays: 0
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

  handleNumberChange = e => {
    const value = parseInt(e.target.value);
    this.props.addDays({dayId: value, pois: {}})
    this.props.updateNumberOfDays(value)
  };

  onSaveChanges = e => {
    e.preventDefault();
    const { currentPack } = this.props;
    const {days, unassignedPois} = this.props
    const { packName } = this.state;
    DataService.updatePackData(currentPack, { packName, unassignedPois, days } );
  };

  render() {
    const { packName } = this.state;
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
                <input type="number" min="0"  max="30" name="day-input" value={numberOfDays || 0} onChange={this.handleNumberChange} />
              </label>
              <button>Save</button>
            </form>
          </div>
        )}
      </div>
    );
  }
}

export default withPOI(withRouter(withDay(withPack(InfoPanel))))
