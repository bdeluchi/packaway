import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addChurchFilter, removeChurchFilter, addMuseumFilter, removeMuseumFilter, addParkFilter, removeParkFilter } from '../../redux/actions/filter_actions'

class CategoryPanel extends Component {

  handleChurchFilter(e) {
    if (e.target.checked) {
      this.props.dispatch(addChurchFilter())
      console.log()
    } else {
      this.props.dispatch(removeChurchFilter())
    }
  }

  render() {
  return (
    <div className="category-panel">
      <h3>Categories</h3>
      <label><input type="checkbox" name="churches" value="churches" onClick={(e) => this.handleChurchFilter(e)}/>churches</label><br/>
      <label><input type="checkbox" name="museums" value="museums" />museums</label><br/>
      <label><input type="checkbox" name="parks" value="parks" />parks</label><br/>
    </div>
  );
};
}


const mapStateToProps = (state) => {
  return {
    poiFilters: state.poiFilters,
  }
}

export default connect(mapStateToProps)(CategoryPanel)