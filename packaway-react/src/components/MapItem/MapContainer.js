import React, { Component } from "react";
import { LoadScript } from "@react-google-maps/api";
import DirectionsItem from './DirectionsItem'
import HotelSearch from '../HotelSearch'

import './MapContainer.scss'

export default class MapContainer extends Component {
  
  render() {
    return (
      <LoadScript
        id="script-loader" googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
        libraries={["places"]}>
        <div className="choose-hotel">Where will you be staying?</div>
        <HotelSearch />
        <DirectionsItem waypoints={this.props.waypoints}/>
      </LoadScript>
    );
  }
}
