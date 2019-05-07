import React from "react";
import PackCartItem from "../PackCartItem";
import DataService from "../../services/data"
import { connect } from 'react-redux';
import { setUserInfo } from '../../redux/actions/userActions';
import { addPoi, removePoi } from '../../redux/actions/poiActions';
import { withRouter } from 'react-router-dom';



// import withPOI from "../../helpers/withPOI";

function PackCart(props) {
  const { pois, userInfo } = props;
  const onCreatePack = () => {
    if (userInfo) {
      DataService.addPack({
        name: 'Enter pack name',
        poiList: pois,
        // city: pois[Object.keys[0]].city,
        userId: userInfo.uid,
        days: []
      })
      props.history.push('/packs/edit')
    } else {
      props.history.push('/login')
    }
    
    //crear pack con id en firebase si conectado o pedir login y guardar el pack en redux mientras
  }

  return (
    <div className="nav__submenu">
      {Object.keys(pois).length !== 0 ? (
        <div className="nav__submenu-item" >
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


const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.user,
    pois: state.poiReducer.pois

  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: (user) => dispatch(setUserInfo(user)),
    setPoiInfo: (poi) => dispatch(addPoi(poi)),
    removePoiInfo: (poi) => dispatch(removePoi(poi))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PackCart));
