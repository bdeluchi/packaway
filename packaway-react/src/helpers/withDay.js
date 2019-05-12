import React from 'react';
import { connect } from 'react-redux';
import {updateNumberOfDays, addDays, addPoiToDay, addUnassignedPois} from '../redux/actions/dayActions'


function withDay(WrappedComponent){
  const NewComponent = (props) => {
    const {numberOfDays} = props;
    return <WrappedComponent dayInfo={numberOfDays} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  return {
    numberOfDays: state.dayReducer.numberOfDays,
    days: state.dayReducer.days,
    unassignedPois: state.dayReducer.unassignedPois
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateNumberOfDays: (day) => dispatch(updateNumberOfDays(day)),
    addDays: (dayObj) => dispatch(addDays(dayObj)),
    addPoiToDay: (day, poi) => dispatch(addPoiToDay(day, poi)),
    addUnassignedPois: (pois) => dispatch(addUnassignedPois(pois))

  };
};

export default withDay;