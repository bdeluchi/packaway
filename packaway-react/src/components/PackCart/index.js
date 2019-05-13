import React, { Component } from "react";
import PackCartItem from "../PackCartItem";
import DataService from "../../services/data";
import { withRouter } from "react-router-dom";
import withPOI from "../../helpers/withPOI";
import withDay from "../../helpers/withDay";
import withPack from "../../helpers/withPack";
import withUser from "../../helpers/withUser";

import "./index.scss";

class PackCart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showCart: false
    };
  }

  handlePackCreate = async () => {
    const { pois, userInfo } = this.props;
    if (userInfo) {
      const packId = await DataService.addPack({
        name: "Enter pack name",
        // city: pois[Object.keys[0]].city,
        userId: userInfo.uid,
        unassignedPois: pois
      });
      if (packId) {
        this.props.setCurrentPack(packId);
        this.props.history.push(`/packs/edit/${packId}`);
      }
    } else {
      this.props.history.push("/login");
    }
  };

  handlePackUpdate = () => {
    const { unassignedPois, currentPack } = this.props;
    // DataService.updatePackPois(currentPack, {unassignedPois: unassignedPois});
    this.props.history.push(`/packs/edit/${currentPack}`);
  };

  handleHover = () => {
    this.setState({ showCart: true });
  };

  handleLeave = () => {
    this.setState({ showCart: false });
  };
  
  render() {
    const { pois, currentPack } = this.props;
    return (
      <div onMouseLeave={this.handleLeave}>
        <div>
          <div
            onMouseEnter={this.handleHover}
          >
            <img
              className="pack-icon"
              src={process.env.PUBLIC_URL + "/assets/luggage.svg"}
              alt="pack cart icon"
            />
          </div>
          {/* {this.state.showCart && ( */}
            <div className="nav__submenu">
              {Object.keys(pois).length !== 0 ? (
                <div className="nav__submenu-item">
                  {currentPack ? (
                    <button onClick={() => this.handlePackUpdate()}>
                      Go to pack
                    </button>
                  ) : (
                    <button onClick={() => this.handlePackCreate()}>
                      New pack
                    </button>
                  )}
                  <div>
                    {Object.entries(pois).map(([key, value]) => (
                      <PackCartItem
                        poiName={value.name}
                        key={value.id}
                        id={value.id}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div>Your pack is empty</div>
              )}
            </div>
          {/* )} */}
        </div>
      </div>
    );
  }
}

export default withRouter(withDay(withPack(withUser(withPOI(PackCart)))));
