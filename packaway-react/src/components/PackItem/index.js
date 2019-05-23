import React, { Component } from "react";
import DataService from "../../services/data";
import {withRouter} from 'react-router-dom'
import withPOI from '../../helpers/withPOI'
import withPack from '../../helpers/withPack'
import withDay from '../../helpers/withDay'

import "./index.scss";

class PackItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null,
      displayMenu: false
    };
  }

  async getPackData() {
    const { packId } = this.props;
    if (packId) {
      const pack = await DataService.getPack(packId);
      this.setState({ pack });
    }
  }

  componentDidMount() {
    this.getPackData();
  }

  componentWillUnmount() {
    this.props.resetDayStatus();
  }

  goToEditPage = () => {
    const { packId } = this.props;
    this.props.resetCart();
    document.removeEventListener("click", this.hideDropdownMenu)
    this.props.history.push(`/packs/edit/${packId}`)
  }

  goToViewPage = () => {
    const { packId } = this.props;
    this.props.history.push(`/packs/view/${packId}`)
    document.removeEventListener("click", this.hideDropdownMenu)
  }

  deletePack = () => {
    const { packId} = this.props;
    const {userId} = this.state.pack
    this.props.deletePackId(packId)
    DataService.deletePack(packId, userId);
    document.removeEventListener("click", this.hideDropdownMenu)
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
  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  componentWillUnmount = () => {
    const {displayMenu} = this.state
    if (displayMenu) {

      this.hideDropdownMenu()
    }
  }

  // handleDropdown = () => {
  //   this.setState(state => {
  //     return {
  //       open: !state.open
  //     };
  //   });
  // }

  render() {
    const { pack, displayMenu } = this.state;
    return (
      <div className="pack-item-container">
        {pack && <React.Fragment>
          <h3 className="pack-name">{pack.name}</h3>
          <div className="pack-content">
            <div className="pack-city">{pack.city}</div>
            <div className="pack-days">{this.getTotalDays()}</div>
          </div>
          <a className="more-options-menu" onClick={this.showDropdownMenu}>
          {displayMenu && <div className="more-options-dropdown">
            <ul>
              <li className="menu-option-item" onClick={this.goToEditPage}>Edit pack</li>
              {pack.days.length !== 0 && <li className="menu-option-item" onClick={this.goToViewPage}>View pack</li>}
              <li className="menu-option-item" onClick={this.deletePack}>Delete pack</li>
            </ul>
          </div>}
        </a>
        </React.Fragment>}
      </div>
    );
  }
}

export default withDay(withPack(withPOI(withRouter(PackItem))))
