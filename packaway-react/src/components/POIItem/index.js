import React, { useState } from "react";
import { connect } from "react-redux";
import {addPoi} from '../../redux/actions/poiActions'


function POIItem(props) {
  const {poi} = props;
  const [inCart, changeButton] = useState(false);

  const addToCart = () => {
    props.setPoiInfo(poi);
    changeButton(true) //está mal porque si vuelvo a entrar no se cambia
  }

  const removeFromCart = () => {
    changeButton(false)
  }


  return (
    <div className="poi-item">
      {poi.name}
        {!inCart ? (<button onClick={() => addToCart()}>ADD</button>)
        :
        (<button onClick={() => removeFromCart()}>REMOVE</button>)}

    </div>
  );
}


const mapStateToProps = state => {
  return {
    pois: state.poiReducer.pois
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPoiInfo: (poi) => dispatch(addPoi(poi))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(POIItem);
