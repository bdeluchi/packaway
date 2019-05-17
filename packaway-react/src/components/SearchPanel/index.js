import React, { Component } from "react";
import { connect } from "react-redux";
import POIItem from "../POIItem";
import DataService from "../../services/data"
import {withRouter} from 'react-router-dom'
// import churchArr from "./church.json"
// import parkArr from "./park.json"
// import museumArr from "./museum.json"

import "./index.scss"

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formInput: null,
      loading: false,
      page: 0,
      hasNextPage: false
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
    window.scrollTo(0, 0)
    this.setState({page: --page})
    this.getData(queryFirstVisible, "desc");
  }

  nextData = () => {  
    const {queryLastVisible} = this.state;
    let { page } = this.state;
    window.scrollTo(0, 0)
    this.setState({page: ++page})
    this.getData(queryLastVisible)
  }
  
  async getData(lastVisible, order) {
    this.setState({loading: true});
    const {poiFilters} = this.props;
    const filteredTypes = [];
    Object.entries(poiFilters).forEach((key, value) => {
      if (key[1] === true ) {
        filteredTypes.push(key[0])
      }
    })
    if (filteredTypes.length === 0) {
      const city = this.props.match.params.cityId;
      const {results, queryLastVisible, queryFirstVisible, hasNextPage} = await DataService.getPOIPaginated(lastVisible, order, city);
      this.setState({pois: results, queryLastVisible, queryFirstVisible, loading: false, hasNextPage})
    } else {
      // const {results} = await DataService.getPoisByType(filteredTypes)
      // this.setState({pois: results, loading: false})
    }  
  }

  async componentDidMount() {
    this.getData();
  }

  render() {
    const {pois, page, hasNextPage} = this.state;
    return (
      <div className="search-panel">
        <div className="search-box">
          {/* <form onSubmit={e => this.handleSearch(e)}>
            <input
              className="search-box"
              type="text"
              name="poi"
              placeholder="Search for POIs..."
              onChange={this.handleChange}
            />
            <button>Search</button>
          </form> */}
        </div>
        <div className="pois-container">
          {pois && <React.Fragment>
            {pois.map(poi => (
              <POIItem poi={poi} key={poi.id} />
            ))}
          </React.Fragment>}
          <div className="pagination-container">
          {page !== 0 && 
          <button 
            className="pagination-btn prev-btn" 
            onClick={this.prevData}>Previous</button>
          }
          <div className="spacing"></div>
          {hasNextPage &&
          <button 
            className="pagination-btn next-btn" 
            onClick={this.nextData}>Next</button>
            }
          </div>
        </div>
        {/* <button onClick={this.handleClick()}>add to db</button> */}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    poiFilters: state.categoryFilterReducer
  };
};

export default withRouter(connect(mapStateToProps)(SearchPanel))