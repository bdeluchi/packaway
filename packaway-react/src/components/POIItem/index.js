import React from "react";
import withPOI from '../../helpers/withPOI'
import withDay from '../../helpers/withDay'

import "./index.scss"

function POIItem(props) {
  const {poi, pois} = props;
  const inCart = pois ? Object.keys(pois).includes(poi.id) : false;

  const addToCart = () => {
    props.setPoiInfo(poi);
    props.addUnassignedPois(poi);
  }

  const removeFromCart = () => {
    props.removePoiInfo(poi.id);
    props.removePoi(poi.id);
  }
  return (
    <div className="poi-card">
      <div className="poi-card-header">
        <div className="poi-item-name">{poi.name}</div>
        {!inCart ? (<button className="poi-item-btn add-btn" onClick={() => addToCart()}>ADD</button>)
        :
        (<button className="poi-item-btn remove-btn" onClick={() => removeFromCart()}>REMOVE</button>)}
      </div>
      <div className="poi-card-image-container">
          <img className="poi-item-image"src={poi.photo_url ? poi.photo_url : process.env.PUBLIC_URL + "/assets/placeholder_poi.png"} alt={poi.name} />
      </div>
    </div>
  );
}

export default withDay(withPOI(POIItem))
