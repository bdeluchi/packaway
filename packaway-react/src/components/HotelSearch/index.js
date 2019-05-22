import React, { Component } from "react";
import withPack from "../../helpers/withPack";

import { Autocomplete } from "@react-google-maps/api";

import "./index.scss";

class HotelSearch extends Component {
  constructor(props) {
    super(props);
    this.onLoad = this.onLoad.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
  }

  onLoad(autocomplete) {
    console.log("autocomplete: ", autocomplete);

    this.autocomplete = autocomplete;

    this.autocomplete.addListener("place_changed", this.onPlaceChanged);
  }

  onPlaceChanged() {
    if (this.autocomplete !== null) {
      const autoResults = this.autocomplete.getPlace();
      const originLocation = autoResults.geometry.location;
      this.props.setCurrentPackOrigin(originLocation);
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  render() {
    return (
      <Autocomplete onLoad={this.onLoad} onPlacesChanged={this.onPlaceChanged}>
        <input
          className="hotel-search-input"
          type="text"
          placeholder="Write your hotel name here"
        />
      </Autocomplete>
    );
  }
}
export default withPack(HotelSearch);
