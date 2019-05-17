import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PackCart from "../PackCart";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import withPack from "../../helpers/withPack";
import { withRouter } from "react-router-dom";
import "./index.scss";

class Navbar extends Component {

  closeMenu = () => {
    this.props.closeMenu()
  }
  render() {
    const { pathname } = this.props.location;
    return (
      <nav className="navigation-bar">
        <div className="nav-container">
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
          <li className="nav-myaccount nav__menu-item">
            {pathname.includes("/poisearch") && <PackCart />}
          </li>

          <li className="nav-myaccount nav__menu-item dropdown-menu"><Dropdown closeMenu={this.closeMenu}/></li>
          <li className="nav-myaccount nav__menu-item burger-menu">
            <DrawerToggleButton click={this.props.drawerClickHandler} />
          </li>
        </ul>
        </div>
      </nav>
    );
  }
}

export default withPack(withRouter(Navbar));
