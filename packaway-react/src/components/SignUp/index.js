import React, { Component } from "react";
import AuthService from "../../services/auth"
import DataService from "../../services/data"
import { withRouter } from "react-router-dom";

import './index.scss'

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      lastname: '',
      email: '',
      password: '',
      errorMessage: ''
      
    };

  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount() {
    AuthService.registerAuthObserver(user => {

      if (user) {
        const { name, lastname, email } = this.state;
        if (name && lastname && email) {
          const success = DataService.addObjectWithId("users", user.uid, {
            name,
            lastname,
            email,
            uid: user.uid
          });
  
          if(success) {
            this.props.history.push('/')
          }
        } else {
          console.log("ojo, no hay usuario")
        }

        }

    });
  }

  onSignUp = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.setState({ errorMessage: "" });

    const error = await AuthService.signup(email, password);
    if (error) {
      this.setState({ errorMessage: AuthService.getErrorMessage(error) });
    }
  };

  render() {
    const { email, name, lastname, password, errorMessage } = this.state;
    return (
      <div className="signup-container">
        <h1 className="signup-title">Sign Up</h1>
        <form className="signup-form" onSubmit={this.onSignUp}>
          <div>
            <label className="signup-input-label">Name:</label>
            <input className="signup-input-field"
              type="name"
              name="name"
              value={name}
              onChange={this.onChangeInput}
            />
            
          </div>
          <div>
            <label className="signup-input-label">Last Name:</label>
            <input className="signup-input-field"
              type="lastname"
              name="lastname"
              value={lastname}
              onChange={this.onChangeInput}
            />
            
          </div>
          <div>
            <label className="signup-input-label">Email:</label>
            <input className="signup-input-field"
              type="email"
              name="email"
              value={email}
              onChange={this.onChangeInput}
            />
            
          </div>
          <div>
            <label className="signup-input-label">Password:</label>
            <input className="signup-input-field"
              type="password"
              name="password"
              value={password}
              onChange={this.onChangeInput}
            />
            
          </div>
          <button className="signup-btn">Sign up</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(SignUp)