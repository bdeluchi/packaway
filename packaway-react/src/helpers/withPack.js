import React from 'react';
import { connect } from 'react-redux';
import {setCurrentPack} from '../redux/actions/packActions'


function withPack(WrappedComponent){
  const NewComponent = (props) => {
    const currentPack = props;
    return <WrappedComponent packInfo={currentPack} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  return {
    currentPack: state.packReducer.currentPack  }
}


const mapDispatchToProps = dispatch => {
  return {
    setCurrentPack: (pack) => dispatch(setCurrentPack(pack))
  };
};

export default withPack;
