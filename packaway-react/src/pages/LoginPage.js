import React, { Component } from 'react';
import Login from '../components/Login'
import SignUp from '../components/SignUp'

export default class LoginPage extends Component {
  render() {
    console.log(this.props.history)
    return (
      <div>
        <SignUp history={this.props.history}/>
        <Login history={this.props.history}/>
      </div>
    );
  }
}
