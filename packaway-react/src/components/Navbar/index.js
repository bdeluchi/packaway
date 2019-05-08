import React, { Component } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../Dropdown";
import PackCart from "../PackCart";
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
    return (
      <nav>
        <ul className="nav__menu">
          <li className="nav__menu-item">
            <Link to="/">Packaway</Link>
          </li>
          <li className="nav-myaccount nav__menu-item">
            <Dropdown />
          </li>

          {pathname.includes("/poisearch") && (
            <li
              className="nav-mypack nav__menu-item"
              onMouseLeave={this.handleLeave}
            >
              <div
                className="submenu-container"
                onMouseEnter={this.handleHover}
              >
                My Pack
                {this.state.showCart && <PackCart />}
              </div>
            </li>
          )}
        </ul>
      </nav>
    );
  }
}

export default withRouter(Navbar);
