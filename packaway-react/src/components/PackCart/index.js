import React from "react";
import PackCartItem from "../PackCartItem"

import withPOI from "../../helpers/withPOI";

function PackCart(props) {
  const { pois } = props;
  return (
    <div>
      <div>My Packs</div>
      {pois ? (
        <div>{Object.entries(pois).map(
          ([key, value]) => <PackCartItem poiName={value.name} key={value.id} />
      )}</div>
      ) : (
        <div>Your pack is empty</div>
      )}
    </div>
  );
}

export default withPOI(PackCart);
