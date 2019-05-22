import React, { Component } from "react";
import withPack from "../../helpers/withPack";
import withPOI from "../../helpers/withPOI";
import withDay from "../../helpers/withDay";
import DataService from "../../services/data";
import POIListItem from "../POIListItem";
import InfoPanel from "../InfoPanel";
import { withRouter } from "react-router-dom";

import "./index.scss";

class MyPOIList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null
    };
  }

  async getData() {
    const { packId } = this.props.match.params;
    if (packId) {
      const pack = await DataService.getPack(packId);
      const { unassignedPois, days } = pack;
      Object.values(unassignedPois).forEach(poi => {
        this.props.addUnassignedPois(poi);
        this.props.setPoiInfo(poi);
      });
      if (days) {
        days.forEach(day =>
          Object.values(day.pois).forEach(poi => this.props.setPoiInfo(poi))
        );
        Object.values(days).map(day => this.props.addDays(day));
        this.props.updateNumberOfDays(days.length);
      }
      this.setState({ pack });
    }
  }

  async componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    this.props.resetDayStatus();
  }

  handleAddMore = () => {
    const { city } = this.state.pack;
    this.props.history.push(`/poisearch/${city}`);
    this.props.resetUnassigned();
  };

  render() {
    const { pack } = this.state;
    const { unassignedPois } = this.props;
    return (
      <div className="info-and-list-container">
        {pack && unassignedPois && (
          <React.Fragment>
            <InfoPanel packName={pack.name} packCity={pack.city} />
            <div className="mypois-container">
              <h2 className="edit-page-subtitle">My list</h2>
              <div>
                {Object.entries(unassignedPois).map(([key, value]) => (
                  <POIListItem key={value.id} poi={value} />
                ))}
                {Object.entries(unassignedPois).length === 0 && (
                  <div className="pois-placeholder">All assigned!</div>
                )}
              </div>
              <button className="add-more-btn" onClick={this.handleAddMore}>
                Add more!
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withDay(withPOI(withRouter(withPack(MyPOIList))));
