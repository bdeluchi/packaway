import React from "react";
import withPOI from '../../helpers/withPOI'
import withDay from '../../helpers/withDay'



function POIItem(props) {
  const {poi, pois} = props;
  const inCart = pois ? Object.keys(pois).includes(poi.id) : false;

  const addToCart = () => {
    props.setPoiInfo(poi);
    props.addUnassignedPois(poi);
  }

  const removeFromCart = () => {
    props.removePoiInfo(poi.id);
    props.removePoi(poi.id)
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

export default withDay(withPOI(POIItem))
