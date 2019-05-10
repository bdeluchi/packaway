import React, { Component } from "react";

import POIItem from "../POIItem";
import DataService from "../../services/data"

export default class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: null,
      loading: false,
      page: 0
    };
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ formInput: value });
  };

  handleSearch = e => {
    e.preventDefault();
    const { formInput, pois } = this.state;
    console.log(pois.filter(poi => poi.name.includes(formInput)));
  };

  // handleClick = () => {
  //   const poiArr = [...churchArr, ...parkArr, ...museumArr];
  //   poiArr.forEach(poi => DataService.addItem("pois", poi))
    
  // }

  prevData = () => {
    const {queryFirstVisible} = this.state;
    let { page } = this.state;
    this.setState({page: --page})
    this.getData(queryFirstVisible, "desc");
  }

  nextData = () => {
    const {queryLastVisible} = this.state;
    let { page } = this.state;
    this.setState({page: ++page})
    this.getData(queryLastVisible)
  }
  
  async getData(lastVisible, order) {
    this.setState({loading: true});
    const {results, queryLastVisible, queryFirstVisible} = await DataService.getPOIPaginated(lastVisible, order);
    this.setState({pois: results, queryLastVisible, queryFirstVisible, loading: false})
  }

  async componentDidMount() {
    this.getData();
  }

  render() {
    const {pois, page} = this.state;
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
          {pois && <div>
            {pois.map(poi => (
              <POIItem poi={poi} key={poi.id} />
            ))}
          </div>}
          {page !== 0 && <button onClick={this.prevData}>Previous</button>}
          <button onClick={this.nextData}>Next</button>
        </div>
        {/* <button onClick={this.handleClick()}>add to db</button> */}
      </div>
    );
  }
}
