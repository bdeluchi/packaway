import React from "react";
import PackCartItem from "../PackCartItem";
import DataService from "../../services/data";
import { withRouter } from "react-router-dom";
import withPOI from "../../helpers/withPOI";
import withPack from "../../helpers/withPack";
import withUser from "../../helpers/withUser";

function PackCart(props) {
  const { pois, userInfo, currentPack } = props;

  const handlePackCreate = async () => {
    if (userInfo) {
      const packId = await DataService.addPack({
        name: "Enter pack name",
        // city: pois[Object.keys[0]].city,
        userId: userInfo.uid,
        days: {unassignedPois: pois, day1: {}}
      });
      if (packId) {
        props.setCurrentPack(packId);
        props.history.push(`/packs/edit/${packId}`);
      }
    } else {
      props.history.push("/login");
    }
  };

  const handlePackUpdate = () => {
    DataService.updatePackPois(currentPack, pois)
  };

  return (
    <div className="nav__submenu">
      {Object.keys(pois).length !== 0 ? (
        <div className="nav__submenu-item">
          {currentPack ? (
            <button onClick={() => handlePackUpdate()}>Update pack</button>
          ) : (
            <button onClick={() => handlePackCreate()}>New pack</button>
          )}
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

export default withRouter(withPack(withUser(withPOI(PackCart))));
