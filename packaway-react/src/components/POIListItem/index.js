import React from "react";


export default function POIListItem(props) {
  const { poiName, poiId } = props;

  // const removeFromCart = () => {
  //   props.removePoiInfo(id);
  // }

  return (
    <div>
      {poiName}
    </div>
  );
}


