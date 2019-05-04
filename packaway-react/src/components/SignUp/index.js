import React, { Component } from "react";
import AuthService from "../../services/auth"
import DataService from "../../services/data"

export default class LoginPage extends Component {
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
      <div>
        <h1>Sign Up</h1>
        <form onSubmit={this.onSignUp}>
          <div>
            <label>Name</label>
            <input
              type="name"
              name="name"
              value={name}
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <label>Last Name</label>
            <input
              type="lastname"
              name="lastname"
              value={lastname}
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={this.onChangeInput}
            />
          </div>
          <button>Sign up</button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>
      </div>
    );
  }
}
