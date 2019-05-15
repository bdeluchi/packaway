import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../../helpers/withUser";
import withPOI from "../../helpers/withPOI";
import withPack from "../../helpers/withPack";
import AuthService from "../../services/auth";
import {withRouter} from 'react-router-dom'

import "./index.scss";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayMenu: false
    };
  }

  showDropdownMenu = event => {
    event.preventDefault();
    this.setState({ displayMenu: true }, () => {
      document.addEventListener("click", this.hideDropdownMenu);
    });
  };

  hideDropdownMenu = () => {
    this.setState({ displayMenu: false }, () => {
      document.removeEventListener("click", this.hideDropdownMenu);
    });
  };

  logout = () => {
    AuthService.logout();
    this.props.resetCart();
    this.props.setCurrentPack("");
    this.props.setUserInfo(null);
    this.props.history.push("/");
  };

  render() {
    const { userInfo } = this.props;
    const { displayMenu } = this.state;

    return (
      <React.Fragment>
        <div className="myaccount-menu" onClick={this.showDropdownMenu}>
          <div className="my-account-btn">My Account</div>
          {displayMenu && (
            <ul className="myaccount-menu-main">
              {userInfo ? (
                <React.Fragment>
                  <li className="myaccount-menu-item">
                    <Link to="/packs">My packs</Link>
                  </li>
                  <li className="myaccount-menu-item">
                    <Link to="/profile">My profile</Link>
                  </li>
                  <li className="myaccount-menu-item" onClick={this.logout}>
                    Logout
                  </li>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <li className="myaccount-menu-item">
                    <Link to="/login">Login</Link>
                  </li>
                </React.Fragment>
              )}
            </ul>
          )}
        </div>
        <div className="sidebar-menu">
          {userInfo ? (
            <ul className="sidebar-main">
              <li className="sidebar-menu-item">
                <Link to="/packs">My packs</Link>
              </li>
              <li className="sidebar-menu-item">
                <Link to="/profile">My profile</Link>
              </li>
              <li className="sidebar-menu-item last-item" onClick={this.logout}>
                Logout
              </li>
            </ul>
          ) : (
            <ul>
              <li className="sidebar-menu-item last-item">
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(withPack(withPOI(withUser(Dropdown))))
