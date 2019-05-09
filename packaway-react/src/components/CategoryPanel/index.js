import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addChurchFilter, removeChurchFilter, addMuseumFilter, removeMuseumFilter, addParkFilter, removeParkFilter } from '../../redux/actions/filterActions'

class CategoryPanel extends Component {

  handleChurchFilter = (e) => {
    if (e.target.checked) {
      this.props.dispatch(addChurchFilter())
    } else {
      this.props.dispatch(removeChurchFilter())
    }
  }

  handleMuseumFilter = (e) => {
    if (e.target.checked) {
      this.props.dispatch(addMuseumFilter())
    } else {
      this.props.dispatch(removeMuseumFilter())
    }
  }

  handleParkFilter = (e) => {
    if (e.target.checked) {
      this.props.dispatch(addParkFilter())
    } else {
      this.props.dispatch(removeParkFilter())
    }
  }

  render() {
    // console.log(this.props.poiFilters)
  return (
    <div className="category-panel">
      <h3>Categories</h3>
      <label><input type="checkbox" name="churches" value="churches" onClick={(e) => this.handleChurchFilter(e)}/>churches</label><br/>
      <label><input type="checkbox" name="museums" value="museums" onClick={(e) => this.handleMuseumFilter(e)}/>museums</label><br/>
      <label><input type="checkbox" name="parks" value="parks" onClick={(e) => this.handleParkFilter(e)}/>parks</label><br/>
    </div>
  );
};
}


const mapStateToProps = (state) => {
  return {
    poiFilters: state.categoryFilterReducer,
  }
}

export default connect(mapStateToProps)(CategoryPanel)