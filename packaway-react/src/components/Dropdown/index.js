import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { setUserInfo } from '../../redux/actions/userActions';
import AuthService from '../../services/auth';
import DataService from '../../services/data';

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

  componentDidMount() {
    AuthService.registerAuthObserver(async (user) => {
      console.log("dropdown")
      if (user) {
        console.log('User is signed in')
        const userDetail = await DataService.getObjectDetail('users', user.uid);

        if(userDetail) {
          this.props.setUserInfo(userDetail)
        } else {
          console.log("ESPERAAAAAA me estoy registrando");
        }
        
      } else {
        console.log('User is signed out')
      }
      this.setState({loading: false})
    })
  }


  logout = () => {
    AuthService.logout();
    this.props.setUserInfo(null);
  }


  render() {
    const { userInfo } = this.props;
    const { loading } = this.state;

    if(loading) return <div>Loading</div>;

    return (
      <div className="dropdown">
        <div className="myaccount-menu" onClick={this.showDropdownMenu}>
          My account
        </div>
        {this.state.displayMenu ? (
          userInfo ? (
            <ul>
              <li>
                <Link to="/packs">My Packs</Link>
              </li>
              <li><Link to="/profile">My Profile</Link></li>
              <li onClick={this.logout}
              >Logout</li>
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
    userInfo: state.userReducer.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: (user) => dispatch(setUserInfo(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dropdown);
