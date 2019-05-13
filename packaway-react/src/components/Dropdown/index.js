import React, { Component } from "react";
import { Link } from "react-router-dom";
import withUser from "../../helpers/withUser";
import withPOI from "../../helpers/withPOI";
import withPack from "../../helpers/withPack";
import AuthService from "../../services/auth";

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
  };

  render() {
    const { userInfo } = this.props;
    const { displayMenu } = this.state;

    return (
      <React.Fragment>
        <div className="myaccount-menu" onClick={this.showDropdownMenu}>
          My Account
          {displayMenu && <div>
            {userInfo ? (
              <ul>
                <li>
                  <Link to="/packs">My Packs</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li onClick={this.logout}>Logout</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
          </div>}
        </div>
       
        <div className="burger-menu">
            {userInfo ? (
              <ul>
                <li>
                  <Link to="/packs">My Packs</Link>
                </li>
                <li>
                  <Link to="/profile">My Profile</Link>
                </li>
                <li onClick={this.logout}>Logout</li>
              </ul>
            ) : (
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            )}
             </div>
      </React.Fragment>
    );
  }
}

export default withPack(withPOI(withUser(Dropdown)));
