import React from 'react';
import { connect } from 'react-redux';
import {addPoi, removePoi} from '../redux/actions/poiActions'


function withPOI(WrappedComponent){
  const NewComponent = (props) => {
    const userInfo = props;
    return <WrappedComponent userInfo={userInfo} {...props} />
  }

  return connect(mapStateToProps, mapDispatchToProps)(NewComponent)
}

const mapStateToProps = (state) => {
  return {
    pois: state.poiReducer.pois
  }
}


const mapDispatchToProps = dispatch => {
  return {
    setPoiInfo: (poi) => dispatch(addPoi(poi)),
    removePoiInfo: (poi) => dispatch(removePoi(poi))

  };
};

export default withPOI;
