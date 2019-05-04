import React, { Component } from "react";

import POIItem from "../POIItem";

import churchArr from "../../data/church";
import parkArr from "../../data/park";
import museumArr from "../../data/museum";

export default class SearchPanel extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      formInput: null 
    }
  }
  
  handleChange = ({target}) => {
    const value = target.value;
    this.setState({formInput: value})
  }

  handleSearch = (e) => {
    e.preventDefault()
    const poiArr = [...churchArr, ...parkArr, ...museumArr];
    const {formInput} = this.state
    console.log(poiArr.filter(poi => poi.name.includes(formInput)))

  }

  render() {
    const poiArr = [...churchArr, ...parkArr, ...museumArr];
    // console.log(poiArr.filter(poi => poi.types.includes('church')))

    return (
      <div className="search-panel">
        <div className="search-box">
          <form onSubmit={e => this.handleSearch(e)}>
            <input
              className="search-box"
              type="text"
              name="poi"
              placeholder="Search for POIs..."
              onChange={this.handleChange}
            />
            <button>Search</button>
          </form>
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
