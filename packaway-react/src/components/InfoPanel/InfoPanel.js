import React, { Component } from "react";
import DataService from "../../services/data";
import withPack from "../../helpers/withPack"



class InfoPanel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      packName: this.props.packName,
      numberOfDays: 1
    };
  }

  handleInputChange = e => {
    const value = e.target.value;
    this.setState({ packName: value });
  };

  handleDropdownChange = e => {
    const value = parseInt(e.target.value);
    this.setState({ numberOfDays: value });
  };

  onSaveChanges = e => {
    e.preventDefault();
    const {currentPack} = this.props
    const {packName} = this.state
    const name = { name: packName }
    DataService.updatePack(currentPack, name);
  }

  //function to save updates de FB

  render() {
    const { packName } = this.state;
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
              <select name="day-input" onChange={this.handleDropdownChange}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </label>
            <button>Save</button>
            </form>
          </div>
          
        )}
      </div>
    );
  }
}

export default withPack(InfoPanel);
