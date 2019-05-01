import React, { Component } from "react";
import { Link } from "react-router-dom";
//hooks

class Dropdown extends Component {
  constructor() {
    super();

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

  render() {
    const userStatus = false; //handle this via redux
    return (
      <div className="dropdown">
        <div className="myaccount-menu" onClick={this.showDropdownMenu}>
          My account
        </div>
        {this.state.displayMenu ? (
          userStatus ? (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/packs">My Packs</Link>
              </li>
              <li>My Profile</li>
              <li>Logout</li>
            </ul>
          )
        ) : null}
      </div>
    );
  }
}

export default Dropdown;
