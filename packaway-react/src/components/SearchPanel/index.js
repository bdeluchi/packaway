import React, { Component } from "react";

import POIItem from "../POIItem";

import churchArr from "../../data/church";
import parkArr from "../../data/park";
import museumArr from "../../data/museum";

export default class SearchPanel extends Component {
  render() {
    const poiArr = [...churchArr, ...parkArr, ...museumArr];
    // console.log(poiArr.filter(poi => poi.types.includes('church')))
    return (
      <div className="search-panel">
        <div className="search-box">
          <input
            className="search-box"
            type="text"
            placeholder="Search for POIs..."
          />
          <button>Search</button>
        </div>
        <div className="poi-container">
          <div>
            {poiArr.map(poi => (
              <POIItem poi={poi} key={poi.id} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
