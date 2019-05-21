import React, { Component } from "react";
import MapContainer from "../../components/MapItem/MapContainer";
import FinalPOI from "../../components/FinalPOI"
import { withRouter } from "react-router-dom";
import DataService from "../../services/data";

import "./ViewPackPage.scss";

class ViewPackPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pack: null,
      selectedDay: null
    };
  }

  async getPack() {
    const { packId } = this.props.match.params;
    if (packId) {
      const pack = await DataService.getPack(packId);
      const defaultDay = pack.days[0]
      this.getWaypoints(defaultDay)
      this.setState({ pack, selectedDay: defaultDay });
    }
  }

  getDays() {
    const totalDays = this.state.pack.days.length;
    let dayArr = [];
    for (let i = 1; i <= totalDays; i++) {
      dayArr.push(
        <option className="day-option" key={i} value={i}>
          Day {i}
        </option>
      );
    }
    return dayArr;
  }

  onDropdownSelected = e => {
    const { pack } = this.state;
    const inputDay = parseInt(e.target.value);
    const selectedDay = pack.days.filter(day => day.dayId === inputDay)[0];
    this.getWaypoints(selectedDay)
    this.setState({ selectedDay });
  };

  getWaypoints = (day) => {
    let waypointsArray = []
    Object.values(day.pois).map(poi => waypointsArray.push(poi.location))
    return waypointsArray;
  }


  async componentDidMount() {
    this.getPack();
  }

  render() {
    const { pack, selectedDay } = this.state;
    return (
      <div className="view-page-container">
        {pack && (
          <React.Fragment>
            <div className="pack-info">
              <h1 className="view-pack-city">{pack.city}</h1>
              <h4 className="view-pack-name">Pack: {pack.name}</h4>
            </div>
            <div className="input-container">
              <select className="select-days" name="days" onChange={this.onDropdownSelected}>
                {this.getDays()}
              </select>
            </div>
            {selectedDay && <div className="poi-list-container">
            <h2 className="edit-page-subtitle">Day {selectedDay.dayId}</h2>
            {Object.values(selectedDay.pois).map(poi => <FinalPOI key={poi.id} poiName={poi.name}/>)}
            </div>}
            {selectedDay && <div className="map-component">
              <MapContainer waypoints={this.getWaypoints(selectedDay)} />
            </div>
            }
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default withRouter(ViewPackPage);
