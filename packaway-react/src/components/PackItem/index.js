import React, { Component } from "react";
import DataService from "../../services/data";

import "./index.scss";

class PackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null,
      open: false
    };
  }

  async getPackData() {
    const { packId } = this.props;
    if (packId) {
      const pack = await DataService.getPack(packId);
      this.setState({ pack });
    }
  }

  async componentDidMount() {
    this.getPackData();
  }

  getTotalDays() {
    const { pack } = this.state;
    if (!pack.days) {
      return '0 days'
    } else if (pack.days.length === 1) {
      return '1 day';
    } else {
      return `${pack.days.length} days`;
    }
  }

  handleDropdown = () => {
    this.setState(state => {
      return {
        open: !state.open
      };
    });
  }

  render() {
    const { pack, open } = this.state;
    return (
      <div className="pack-item-container">
        {pack && <React.Fragment>
          <h3 className="pack-name">{pack.name}</h3>
          <div className="pack-content">
            <div className="pack-city">{pack.city}</div>
            <div className="pack-days">{this.getTotalDays()}</div>
          </div>
          <a className="more-options-menu" onClick={this.handleDropdown}>
          {open && <div className="more-options-dropdown">
            <ul>
              <li className="menu-option-item">Edit pack</li>
              <li className="menu-option-item">View pack</li>
              <li className="menu-option-item">Delete pack</li>
            </ul>
          </div>}
        </a>
        </React.Fragment>}
      </div>
    );
  }
}

export default PackItem;
