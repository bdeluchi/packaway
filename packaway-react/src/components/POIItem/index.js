import React from "react";
// import { connect } from "react-redux";
// import {addPoi} from '../../redux/actions/poiActions'
import withPOI from '../../helpers/withPOI'


function POIItem(props) {
  const {poi, pois} = props;
  const inCart = pois ? Object.keys(pois).includes(poi.id) : false;

  const addToCart = () => {
    props.setPoiInfo(poi);
  }

  const removeFromCart = () => {
    props.removePoiInfo(poi.id);
    console.log(poi.id)
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


// const mapStateToProps = state => {
//   return {
//     pois: state.poiReducer.pois
//   }
// }

// const mapDispatchToProps = dispatch => {
//   return {
//     setPoiInfo: (poi) => dispatch(addPoi(poi))
//   };
// };

export default withPOI(POIItem);
