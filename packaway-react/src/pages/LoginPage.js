import React, { Component } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

import './LoginPage.scss'

export default class LoginPage extends Component {
  render() {
    return (
      <div className="login-page-main">
        <SignUp />
        <Login />
      </div>
    );
  }
}
