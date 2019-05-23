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
      hasNextPage: false,
      selectedOption: ''
    };
  }

  handleChange = ({ target }) => {
    const value = target.value;
    this.setState({ formInput: value });
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
    const lastOption = this.state.selectedOption;
    const selectedOption = this.props.selectedOption;

    console.log("last: ", lastVisible)

    if (lastOption && selectedOption) {
      if (lastOption.selectedOption !== selectedOption.selectedOption) {
        lastVisible = undefined;
        this.setState({page: 0})
      }
    }
    const city = this.props.match.params.cityId;
    const {results, queryLastVisible, queryFirstVisible, hasNextPage} = await DataService.getPOIPaginated(lastVisible, order, city, selectedOption.selectedOption);
    this.setState({pois: results, queryLastVisible, queryFirstVisible, loading: false, hasNextPage, selectedOption: selectedOption})
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selectedOption !== this.props.selectedOption) {
        this.getData();
      }
  }



  render() {
    const {pois, page, hasNextPage} = this.state;
    return (
      <div className="search-panel">
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
        {/* <button onClick={this.handleClick}>add to db</button> */}
      </div>
    );
  }
}


const mapStateToProps = state => {
  return {
    selectedOption: state.categoryFilterReducer
  };
};

export default withRouter(connect(mapStateToProps)(SearchPanel))