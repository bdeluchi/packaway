import React, { useState } from "react";

export default function POIItem({ poi }) {
  const [inCart, addToCart] = useState(false);

  return (
    <div className="poi-item">
      {poi.name}
      {!inCart ? (
        <button onClick={() => addToCart(true)}>ADD</button>
      ) : (
        <button onClick={() => addToCart(false)}>REMOVE</button>
      )}
    </div>
  );
}
