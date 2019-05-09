import React, { Component } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default class LoginPage extends Component {
  render() {
    return (
      <div>
        <SignUp />
        <Login />
      </div>
    );
  }
}
