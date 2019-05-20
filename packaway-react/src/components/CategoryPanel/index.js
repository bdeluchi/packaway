import React, { Component } from "react";
import { connect } from "react-redux";
import DataService from "../../services/data";
import {addFilter} from "../../redux/actions/filterActions";

import "./index.scss";

class CategoryPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: null
    }
  }
  

  handleOptionChange = (changeEvent) => {
    const selectedOption = changeEvent.target.value
    this.props.dispatch(addFilter(selectedOption));
    this.setState({ selectedOption });
  }

  handleClearFilter = () => {
    const selectedOption = null
    this.props.dispatch(addFilter(selectedOption));
    this.setState({ selectedOption });
  }

  // componentDidMount = () => {
  //   //TODO: me está paginando dos veces, esto lo tengo para que se recargue al volver de otra página
  //   this.handleClearFilter()
  // }
  
  render() {
    return (
      <div className="category-panel">
        <label className="filter-input">
          <input
            type="radio"
            name="church"
            value="church"
            checked={this.state.selectedOption === 'church'}
            onChange={this.handleOptionChange}
          />
          churches
        </label>
        <br />
        <label className="filter-input">
          <input
            type="radio"
            name="museum"
            value="museum"
            checked={this.state.selectedOption === 'museum'}
            onChange={this.handleOptionChange}
          />
          museums
        </label>
        <br />
        <label className="filter-input">
          <input
            type="radio"
            name="park"
            value="park"
            checked={this.state.selectedOption === 'park'}
            onChange={this.handleOptionChange}
          />
          parks
        </label>
        <br />
        <div className="clear-container">
        <button className="clear-btn" onClick={this.handleClearFilter}>Clear</button>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    selectedOption: state.categoryFilterReducer
  };
};

export default connect(mapStateToProps)(CategoryPanel);
