import React, { Component } from "react";
import DataService from "../../services/data";
import {withRouter} from 'react-router-dom'
import withPOI from '../../helpers/withPOI'
import withPack from '../../helpers/withPack'

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

  componentDidMount() {
    this.getPackData();
  }

  goToEditPage = () => {
    const { packId } = this.props;
    this.props.resetCart()
    this.props.history.push(`/packs/edit/${packId}`)
  }

  goToViewPage = () => {
    const { packId } = this.props;
    this.props.history.push(`/packs/view/${packId}`)

  }

  deletePack = () => {
    const { packId} = this.props;
    const {userId} = this.state.pack
    DataService.deletePack(packId, userId);
    //TODO: setstate para hacer un render y se recargue la página
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
              <li className="menu-option-item" onClick={this.goToEditPage}>Edit pack</li>
              <li className="menu-option-item" onClick={this.goToViewPage}>View pack</li>
              <li className="menu-option-item" onClick={this.deletePack}>Delete pack</li>
            </ul>
          </div>}
        </a>
        </React.Fragment>}
      </div>
    );
  }
}

export default withPack(withPOI(withRouter(PackItem)));
