import React from 'react';
import { connect } from 'react-redux';
import {updateNumberOfDays, addDays} from '../redux/actions/dayActions'


function withDay(WrappedComponent){
  const NewComponent = (props) => {
    const {numberOfDays} = props;
    return <WrappedComponent dayInfo={numberOfDays} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  console.log("state: ", state)
  return {
    numberOfDays: state.dayReducer.numberOfDays,
    days: state.dayReducer.days
  }
}


const mapDispatchToProps = dispatch => {
  return {
    updateNumberOfDays: (day) => dispatch(updateNumberOfDays(day)),
    addDays: (dayObj) => dispatch(addDays(dayObj))

  };
};

export default withDay;