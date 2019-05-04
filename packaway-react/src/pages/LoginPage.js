import React, { Component } from 'react';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: ''
    }
  }

  onChangeInput = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  
  render() {
    const {email, password} = this.state;
    return (
      <div>
        
      </div>
    );
  }
}
