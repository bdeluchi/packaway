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
        city: Object.values(pois)[0].city,
        userId: userInfo.uid,
        days: [],
        unassignedPois: pois
      });
      if (packId) {
        this.props.setCurrentPack(packId);
        this.props.history.push(`/packs/edit/${packId}`);
      }
    } else {
      const cityId = Object.values(pois)[0].city;
      const location = {
        pathname: '/login',
        state: { from: {pathname: `/poisearch/${cityId}`} }
      }
      this.props.history.push(location);
      
    }
  };

  handlePackUpdate = () => {
    const { currentPack } = this.props;
    this.props.history.push(`/packs/edit/${currentPack}`);
  };

  handleCartClick = () => {
    this.setState(prevState => {
      return { showCart: !prevState.showCart };
    });
  }


  // showCart = event => {
  //   event.preventDefault();
  //   this.setState({ showCart: true }, () => {
  //     document.addEventListener("click", this.hideCart);
  //   });
  //   //TODO: memory leak when clicking on home with cart open
  // };

  // hideCart = () => {
  //   this.setState({ showCart: false }, () => {
  //     document.removeEventListener("click", this.hideCart);
  //   });
  // };
  
  render() {
    const { pois, currentPack } = this.props;
    return (
      <div>
        <div>
          <div
            onClick={this.handleCartClick}
          >
            <img
              className="pack-icon"
              src={process.env.PUBLIC_URL + "/assets/luggage.svg"}
              alt="pack cart icon"
            />
          </div>
          {this.state.showCart && (
            <React.Fragment>
            <div className="nav__submenu desktop-cart">
              {Object.keys(pois).length !== 0 ? (
                <div className="nav__submenu-item">
                  {currentPack ? (
                    <button className="cart-btn" onClick={() => this.handlePackUpdate()}>
                      Go to pack
                    </button>
                  ) : (
                    <button className="cart-btn" onClick={() => this.handlePackCreate()}>
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
            <div className="nav__submenu mobile-cart">
              {Object.keys(pois).length !== 0 ? (
                <div className="nav__submenu-item">
                  {currentPack ? (
                    <button className="cart-btn" onClick={() => this.handlePackUpdate()}>
                      Go to pack
                    </button>
                  ) : (
                    <button className="cart-btn" onClick={() => this.handlePackCreate()}>
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
            </React.Fragment>
            
          )} 
        </div>
      </div>
    );
  }
}

export default withRouter(withDay(withPack(withUser(withPOI(PackCart)))));
