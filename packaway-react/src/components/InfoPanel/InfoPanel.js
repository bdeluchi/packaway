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

  createDayOptions = () => {
    let options = [];
    for (let i = 1; i <= 30; i++) {
      options.push(<option value={i} key={i}>{i}</option>)
    }
    return options;
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
                {this.createDayOptions()}
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
