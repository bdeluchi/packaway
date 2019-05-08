import React from "react";
import PackCartItem from "../PackCartItem";
import DataService from "../../services/data";
import { connect } from "react-redux";
import { setUserInfo } from "../../redux/actions/userActions";
import { addPoi, removePoi } from "../../redux/actions/poiActions";
import { setCurrentPack } from "../../redux/actions/packActions";
import { withRouter } from "react-router-dom";

// import withPOI from "../../helpers/withPOI";

function PackCart(props) {
  const { pois, userInfo, currentPack } = props;
  const handlePackCreate = () => {
    if (userInfo) {
      (async () => {
        const packId = await DataService.addPack({
          name: "Enter pack name",
          poiList: pois,
          // city: pois[Object.keys[0]].city,
          userId: userInfo.uid,
          days: []
        });
        props.setCurrentPack(packId);
      })();
      props.history.push("/packs/edit");
    } else {
      // props.history.push("/login");
    }
  };

  const handlePackUpdate = () => {
    console.log("updatey matey");
    //call data > updatePack
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

const mapStateToProps = state => {
  return {
    userInfo: state.userReducer.user,
    pois: state.poiReducer.pois,
    currentPack: state.packReducer.currentPack
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: user => dispatch(setUserInfo(user)),
    setPoiInfo: poi => dispatch(addPoi(poi)),
    removePoiInfo: poi => dispatch(removePoi(poi)),
    setCurrentPack: packId => dispatch(setCurrentPack(packId))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PackCart)
);
