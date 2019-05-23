import React from "react";
import withPOI from "../../helpers/withPOI";
import withDay from '../../helpers/withDay';

import './index.scss'

function PackCartItem(props) {
  const { poiName, id } = props;

  const removeFromCart = () => {
    props.removePoiInfo(id);
    props.removePoi(id)
  }

  return (
    <div className="poi-incart">
      <div className="cart-close-btn" onClick={() => removeFromCart()}></div>
      {poiName}
    </div>
  );
}


export default withPOI(withDay(PackCartItem))
