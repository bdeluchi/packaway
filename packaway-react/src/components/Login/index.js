import React, { Component } from "react";
import AuthService from "../../services/auth";
import { withRouter } from "react-router-dom";

import "./index.scss";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastname: "",
      email: "",
      password: "",
      errorMessage: ""
    };

    this.authUnRegister = null;
  }

  onChangeInput = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentWillUnmount() {
    this.authUnRegister && this.authUnRegister();
  }

  componentDidMount() {
    this.authUnRegister = AuthService.registerAuthObserver(user => {});
  }

  onLogin = async e => {
    e.preventDefault();
    const { email, password } = this.state;

    this.setState({ errorMessage: "" });

    if (!email || !password) {
      this.setState({
        errorMessage: "Please enter email and password."
      });
      return;
    }

    const error = await AuthService.login(email, password);

    if (error) {
      this.setState({ errorMessage: AuthService.getErrorMessage(error) });
    } else {
      const {from} = this.props.location.state || {from: {pathname: '/'}}
      this.props.history.push(from) 
    }
  };

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <div className="login-container">
        <h1 className="login-title">Log in</h1>
        <form className="login-form" onSubmit={this.onLogin}>
          <div>
            <label className="login-input-label">Email:</label>
            <input
              className="login-input-field"
              type="email"
              name="email"
              value={email}
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <label className="login-input-label">Password:</label>
            <input
              className="login-input-field"
              type="password"
              name="password"
              value={password}
              onChange={this.onChangeInput}
            />
          </div>
          <button className="login-btn">Log In</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
