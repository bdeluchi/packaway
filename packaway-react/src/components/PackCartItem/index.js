import React from "react";
import withPOI from "../../helpers/withPOI";


function PackCartItem(props) {
  const { poiName, id } = props;

  const removeFromCart = () => {
    props.removePoiInfo(id);
  }

  return (
    <div>
      {poiName}
      <button onClick={() => removeFromCart()}>x</button>
    </div>
  );
}


export default withPOI(PackCartItem);
