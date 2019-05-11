import React from 'react';
import { connect } from 'react-redux';
import {setCurrentPack, updateNumberOfDays} from '../redux/actions/packActions'


function withPack(WrappedComponent){
  const NewComponent = (props) => {
    const currentPack = props;
    return <WrappedComponent packInfo={currentPack} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  return {
    currentPack: state.packReducer.currentPack,
    numberOfDays: state.packReducer.days
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setCurrentPack: (pack) => dispatch(setCurrentPack(pack)),
    updateNumberOfDays: (day) => dispatch(updateNumberOfDays(day))

  };
};

export default withPack;
