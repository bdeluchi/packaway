import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PackCart from "../PackCart";

import "./index.scss";


class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAboutMenu: false
    };
  }
  
  handleHover = () => {
    this.setState({ showAboutMenu: true });
  };

  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };

  render() {
    return (
      <nav>
        <ul className="nav__menu">
          <li className="nav__menu-item">
            <Link to="/">Packaway</Link>
          </li>
          <li className="nav-myaccount nav__menu-item">
            <Dropdown />
          </li>
          <li className="nav-mypack nav__menu-item" onMouseLeave={this.handleLeave}>
            <div className="submenu-container" onMouseEnter={this.handleHover}>
              My Pack
              {this.state.showAboutMenu && <PackCart />}
            </div>
           
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
