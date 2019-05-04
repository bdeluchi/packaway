import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userLoggedIn } from "../../redux/actions/login_actions";
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
    const {userLoggedIn} = this.props;
    return (
      <div className="dropdown">
        <div className="myaccount-menu" onClick={this.showDropdownMenu}>
          My account
        </div>
        {this.state.displayMenu ? (
          userLoggedIn ? (
            <ul>
              <li>
                <Link to="/packs">My Packs</Link>
              </li>
              <li>My Profile</li>
              <li>Logout</li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          )
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userLoggedIn: state.loginStatusReducer.status
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserLoggedIn: newBoolean => dispatch(userLoggedIn(newBoolean))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
