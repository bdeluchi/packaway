import React from "react";
import withPOI from "../../helpers/withPOI";
import withDay from '../../helpers/withDay';



function PackCartItem(props) {
  const { poiName, id } = props;

  const removeFromCart = () => {
    props.removePoiInfo(id);
    props.removePoi(id)
  }

  return (
    <div>
      <button onClick={() => removeFromCart()}>x</button>
      {poiName}
    </div>
  );
}


export default withPOI(withDay(PackCartItem))
