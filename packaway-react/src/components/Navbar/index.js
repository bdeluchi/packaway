import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PackCart from "../PackCart";
import DrawerToggleButton from '../SideDrawer/DrawerToggleButton'
import withPack from "../../helpers/withPack";
import { withRouter } from "react-router-dom";
import "./index.scss";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false
    };
  }

  handleHover = () => {
    this.setState({ showCart: true });
  };

  handleLeave = () => {
    this.setState({ showCart: false });
  };

  render() {
    const { pathname } = this.props.location;
    const { currentPack } = this.props;
    return (
      <nav className="navigation-bar">
        <div className="logo-item">
            <Link to="/">
              <img
                className="logo"
                src={process.env.PUBLIC_URL + "/assets/packaway_logo.svg"}
                alt="packaway logo"
              />
            </Link>
        </div>
        <ul className="nav__menu">
          {pathname.includes("/poisearch") && (
            <li
              className="nav-mypack nav__menu-item"
              onMouseLeave={this.handleLeave}>
              <div className="submenu-container">
                <Link
                  onMouseEnter={this.handleHover}
                  to={`/packs/edit/${currentPack}`}>
                  <img
                    className="pack-icon"
                    src={process.env.PUBLIC_URL + "/assets/luggage.svg"}
                    alt="pack cart icon"/>
                </Link>
                {this.state.showCart && <PackCart />}
              </div>
            </li>
          )}
          <li className="nav-myaccount nav__menu-item">
          <DrawerToggleButton click={this.props.drawerClickHandler}/>
          </li>
        </ul>
      </nav>
    );
  }
}

export default withPack(withRouter(Navbar));
