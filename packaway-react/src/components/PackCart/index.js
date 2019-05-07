import React from "react";
import PackCartItem from "../PackCartItem";

import withPOI from "../../helpers/withPOI";

function PackCart(props) {
  const { pois } = props;

  const onCreatePack = () => {
    console.log('yay, new pack')
    //crear pack con id en firebase si conectado o pedir login y guardar el pack en redux mientras
  }

  return (
    <div>
      <div>My Packs</div>
      {Object.keys(pois).length !== 0 ? (
        <div>
          <button onClick={() => onCreatePack()}>New pack</button>
          <div>
            {Object.entries(pois).map(([key, value]) => (
              <PackCartItem poiName={value.name} key={value.id} id={value.id} />
            ))}
          </div>
        </div>
      ) : (
        <div>Your pack is empty</div>
      )}
    </div>
  );
}

export default withPOI(PackCart);
